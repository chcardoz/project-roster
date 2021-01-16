import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  allCoaches: Array<Coach>;
  currentCoach?: Maybe<Coach>;
  allStudents: Array<Student>;
};

export type Coach = {
  __typename?: 'Coach';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  isCoordinator: Scalars['Boolean'];
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  population: Scalars['String'];
  isActive: Scalars['Boolean'];
  meetingFrequency?: Maybe<Scalars['String']>;
  modeOfMeeting?: Maybe<Scalars['String']>;
  dateLastMet?: Maybe<Scalars['String']>;
  dateLastOutreach?: Maybe<Scalars['String']>;
  meetingCount: Scalars['Int'];
  assignedCoachID?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: CoachResponse;
  forgotPassword: Scalars['Boolean'];
  registerCoach: CoachResponse;
  loginCoach: CoachResponse;
  logout: Scalars['Boolean'];
  createStudent: StudentResponse;
  deleteStudent: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterCoachArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginCoachArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateStudentArgs = {
  options: StudentDetailsInput;
};


export type MutationDeleteStudentArgs = {
  id: Scalars['Float'];
};

export type CoachResponse = {
  __typename?: 'CoachResponse';
  errors?: Maybe<Array<FieldError>>;
  coach?: Maybe<Coach>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type StudentResponse = {
  __typename?: 'StudentResponse';
  errors?: Maybe<Array<StudentFieldError>>;
  student?: Maybe<Student>;
};

export type StudentFieldError = {
  __typename?: 'StudentFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type StudentDetailsInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  population: Scalars['String'];
};

export type BasicStudentFragment = (
  { __typename?: 'Student' }
  & Pick<Student, 'id' | 'email' | 'firstName' | 'lastName' | 'population' | 'isActive' | 'meetingFrequency' | 'modeOfMeeting' | 'dateLastMet' | 'dateLastOutreach' | 'meetingCount' | 'assignedCoachID'>
);

export type BasicUserFragment = (
  { __typename?: 'Coach' }
  & Pick<Coach, 'id' | 'firstName' | 'lastName' | 'username' | 'email'>
);

export type BasicCoachResponseFragment = (
  { __typename?: 'CoachResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & CoachErrorFragment
  )>>, coach?: Maybe<(
    { __typename?: 'Coach' }
    & BasicUserFragment
  )> }
);

export type CoachErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type StudentErrorFragment = (
  { __typename?: 'StudentFieldError' }
  & Pick<StudentFieldError, 'field' | 'message'>
);

export type BasicStudentResponseFragment = (
  { __typename?: 'StudentResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'StudentFieldError' }
    & StudentErrorFragment
  )>>, student?: Maybe<(
    { __typename?: 'Student' }
    & BasicStudentFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'CoachResponse' }
    & BasicCoachResponseFragment
  ) }
);

export type CreateStudentMutationVariables = Exact<{
  options: StudentDetailsInput;
}>;


export type CreateStudentMutation = (
  { __typename?: 'Mutation' }
  & { createStudent: (
    { __typename?: 'StudentResponse' }
    & BasicStudentResponseFragment
  ) }
);

export type DeleteStudentMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteStudentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteStudent'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginCoach: (
    { __typename?: 'CoachResponse' }
    & BasicCoachResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerCoach: (
    { __typename?: 'CoachResponse' }
    & BasicCoachResponseFragment
  ) }
);

export type AllStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllStudentsQuery = (
  { __typename?: 'Query' }
  & { allStudents: Array<(
    { __typename?: 'Student' }
    & Pick<Student, 'firstName' | 'lastName' | 'email' | 'population'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { currentCoach?: Maybe<(
    { __typename?: 'Coach' }
    & BasicUserFragment
  )> }
);

export const CoachErrorFragmentDoc = gql`
    fragment CoachError on FieldError {
  field
  message
}
    `;
export const BasicUserFragmentDoc = gql`
    fragment BasicUser on Coach {
  id
  firstName
  lastName
  username
  email
}
    `;
export const BasicCoachResponseFragmentDoc = gql`
    fragment BasicCoachResponse on CoachResponse {
  errors {
    ...CoachError
  }
  coach {
    ...BasicUser
  }
}
    ${CoachErrorFragmentDoc}
${BasicUserFragmentDoc}`;
export const StudentErrorFragmentDoc = gql`
    fragment StudentError on StudentFieldError {
  field
  message
}
    `;
export const BasicStudentFragmentDoc = gql`
    fragment BasicStudent on Student {
  id
  email
  firstName
  lastName
  population
  isActive
  meetingFrequency
  modeOfMeeting
  dateLastMet
  dateLastOutreach
  meetingCount
  assignedCoachID
}
    `;
export const BasicStudentResponseFragmentDoc = gql`
    fragment BasicStudentResponse on StudentResponse {
  errors {
    ...StudentError
  }
  student {
    ...BasicStudent
  }
}
    ${StudentErrorFragmentDoc}
${BasicStudentFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...BasicCoachResponse
  }
}
    ${BasicCoachResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateStudentDocument = gql`
    mutation CreateStudent($options: StudentDetailsInput!) {
  createStudent(options: $options) {
    ...BasicStudentResponse
  }
}
    ${BasicStudentResponseFragmentDoc}`;

export function useCreateStudentMutation() {
  return Urql.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument);
};
export const DeleteStudentDocument = gql`
    mutation DeleteStudent($id: Float!) {
  deleteStudent(id: $id)
}
    `;

export function useDeleteStudentMutation() {
  return Urql.useMutation<DeleteStudentMutation, DeleteStudentMutationVariables>(DeleteStudentDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  loginCoach(username: $username, password: $password) {
    ...BasicCoachResponse
  }
}
    ${BasicCoachResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  registerCoach(options: $options) {
    ...BasicCoachResponse
  }
}
    ${BasicCoachResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const AllStudentsDocument = gql`
    query AllStudents {
  allStudents {
    firstName
    lastName
    email
    population
  }
}
    `;

export function useAllStudentsQuery(options: Omit<Urql.UseQueryArgs<AllStudentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllStudentsQuery>({ query: AllStudentsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  currentCoach {
    ...BasicUser
  }
}
    ${BasicUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};