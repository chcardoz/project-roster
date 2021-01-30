import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import _ from "lodash";
import { dedupExchange, fetchExchange, stringifyVariables } from "urql";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

const cursorPagination = (typename: string, query: string): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info; //entityKey(Query) fieldName(name of query)
    const allFields = cache.inspectFields(entityKey); //name of query and what arguments passed into it
    const fieldInfos = allFields
      .filter((info) => info.fieldName === fieldName)
      .filter((info) => _.isEqual(info.arguments, fieldArgs)); //only getting the query we want from the cache
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined; //the query we were looking for is not in the cache
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      query
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, query) as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: typename,
      hasMore,
      [query]: results,
    };
  };
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const, //otherwise typescript will start crying
  },
  exchanges: [
    dedupExchange, //this exchange is to make sure duplicates of query are not sent out
    cacheExchange({
      keys: {
        PaginatedStudents: () => null,
        PaginatedMeetings: () => null,
        PaginatedOutreach: () => null,
      },
      resolvers: {
        Query: {
          allStudents: cursorPagination("PaginatedStudents", "allStudents"),
          allMeetings: cursorPagination("PaginatedMeetings", "allMeetings"),
          allOutreach: cursorPagination("PaginatedOutreach", "allOutreach"),
        },
      },
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => {
                return { currentCoach: null };
              }
            );
          },
          loginCoach: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.loginCoach.errors) {
                  return query;
                } else {
                  return {
                    currentCoach: result.loginCoach.coach,
                  };
                }
              }
            );
          },
          registerCoach: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.registerCoach.errors) {
                  return query;
                } else {
                  return {
                    currentCoach: result.registerCoach.coach,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
