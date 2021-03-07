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
  allStudents: PaginatedStudents;
  allMeetings: PaginatedMeetings;
  allOutreach: PaginatedOutreach;
};


export type QueryAllStudentsArgs = {
  options: PaginationInput;
};


export type QueryAllMeetingsArgs = {
  options: PaginationInput;
};


export type QueryAllOutreachArgs = {
  options: PaginationInput;
};

export type Coach = {
  __typename?: 'Coach';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  isCoordinator: Scalars['Boolean'];
  students?: Maybe<Array<Student>>;
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  population: Scalars['String'];
  isActive: Scalars['Boolean'];
  meetingFrequency?: Maybe<Scalars['String']>;
  modeOfMeeting?: Maybe<Scalars['String']>;
  assignedCoachID?: Maybe<Scalars['Int']>;
};

export type PaginatedStudents = {
  __typename?: 'PaginatedStudents';
  allStudents: Array<Student>;
};

export type PaginationInput = {
  coachID?: Maybe<Scalars['Float']>;
  isCoordinator?: Maybe<Scalars['Boolean']>;
};

export type PaginatedMeetings = {
  __typename?: 'PaginatedMeetings';
  allMeetings: Array<Meeting>;
};

export type Meeting = {
  __typename?: 'Meeting';
  id: Scalars['Int'];
  meetingDate: Scalars['String'];
  duration: Scalars['Int'];
  week: Scalars['Int'];
  coachID: Scalars['Int'];
  studentID: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedOutreach = {
  __typename?: 'PaginatedOutreach';
  allOutreach: Array<Outreach>;
};

export type Outreach = {
  __typename?: 'Outreach';
  id: Scalars['Int'];
  type: Scalars['String'];
  outreachDate: Scalars['String'];
  week: Scalars['Int'];
  coachID: Scalars['Int'];
  studentID: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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
  createMeeting: MeetingResponse;
  deleteMeeting: Scalars['Boolean'];
  createOutreach: OutreachResponse;
  deleteOutreach: Scalars['Boolean'];
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


export type MutationCreateMeetingArgs = {
  options: MeetingInput;
};


export type MutationDeleteMeetingArgs = {
  id: Scalars['Float'];
};


export type MutationCreateOutreachArgs = {
  options: OutreachInput;
};


export type MutationDeleteOutreachArgs = {
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
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
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

export type MeetingResponse = {
  __typename?: 'MeetingResponse';
  errors?: Maybe<Array<MeetingFieldError>>;
  meeting?: Maybe<Meeting>;
};

export type MeetingFieldError = {
  __typename?: 'MeetingFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type MeetingInput = {
  studentID: Scalars['Float'];
  meetingDate: Scalars['String'];
  duration: Scalars['Float'];
};

export type OutreachResponse = {
  __typename?: 'OutreachResponse';
  errors?: Maybe<Array<OutreachFieldError>>;
  outreach?: Maybe<Outreach>;
};

export type OutreachFieldError = {
  __typename?: 'OutreachFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type OutreachInput = {
  studentID: Scalars['Float'];
  outreachDate: Scalars['String'];
  type: Scalars['String'];
};

export type CoachErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type StudentErrorFragment = (
  { __typename?: 'StudentFieldError' }
  & Pick<StudentFieldError, 'field' | 'message'>
);

export type MeetingErrorFragment = (
  { __typename?: 'MeetingFieldError' }
  & Pick<MeetingFieldError, 'field' | 'message'>
);

export type OutreachErrorFragment = (
  { __typename?: 'OutreachFieldError' }
  & Pick<OutreachFieldError, 'field' | 'message'>
);

export type BasicUserFragment = (
  { __typename?: 'Coach' }
  & Pick<Coach, 'id' | 'firstName' | 'lastName' | 'username' | 'email' | 'isCoordinator'>
);

export type BasicStudentFragment = (
  { __typename?: 'Student' }
  & Pick<Student, 'id' | 'createdAt' | 'email' | 'firstName' | 'lastName' | 'population' | 'isActive' | 'meetingFrequency' | 'modeOfMeeting' | 'assignedCoachID'>
);

export type BasicMeetingFragment = (
  { __typename?: 'Meeting' }
  & Pick<Meeting, 'id' | 'createdAt' | 'coachID' | 'studentID' | 'meetingDate' | 'duration' | 'week'>
);

export type BasicOutreachFragment = (
  { __typename?: 'Outreach' }
  & Pick<Outreach, 'id' | 'createdAt' | 'coachID' | 'studentID' | 'outreachDate' | 'type' | 'week'>
);

export type BasicOutreachResponseFragment = (
  { __typename?: 'OutreachResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'OutreachFieldError' }
    & OutreachErrorFragment
  )>>, outreach?: Maybe<(
    { __typename?: 'Outreach' }
    & BasicOutreachFragment
  )> }
);

export type BasicMeetingResponseFragment = (
  { __typename?: 'MeetingResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'MeetingFieldError' }
    & MeetingErrorFragment
  )>>, meeting?: Maybe<(
    { __typename?: 'Meeting' }
    & BasicMeetingFragment
  )> }
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

export type CreateMeetingMutationVariables = Exact<{
  options: MeetingInput;
}>;


export type CreateMeetingMutation = (
  { __typename?: 'Mutation' }
  & { createMeeting: (
    { __typename?: 'MeetingResponse' }
    & BasicMeetingResponseFragment
  ) }
);

export type CreateOutreachMutationVariables = Exact<{
  options: OutreachInput;
}>;


export type CreateOutreachMutation = (
  { __typename?: 'Mutation' }
  & { createOutreach: (
    { __typename?: 'OutreachResponse' }
    & BasicOutreachResponseFragment
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

export type AllMeetingsQueryVariables = Exact<{
  options: PaginationInput;
}>;


export type AllMeetingsQuery = (
  { __typename?: 'Query' }
  & { allMeetings: (
    { __typename?: 'PaginatedMeetings' }
    & { allMeetings: Array<(
      { __typename?: 'Meeting' }
      & BasicMeetingFragment
    )> }
  ) }
);

export type AllOutreachQueryVariables = Exact<{
  options: PaginationInput;
}>;


export type AllOutreachQuery = (
  { __typename?: 'Query' }
  & { allOutreach: (
    { __typename?: 'PaginatedOutreach' }
    & { allOutreach: Array<(
      { __typename?: 'Outreach' }
      & BasicOutreachFragment
    )> }
  ) }
);

export type AllStudentsQueryVariables = Exact<{
  options: PaginationInput;
}>;


export type AllStudentsQuery = (
  { __typename?: 'Query' }
  & { allStudents: (
    { __typename?: 'PaginatedStudents' }
    & { allStudents: Array<(
      { __typename?: 'Student' }
      & BasicStudentFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { currentCoach?: Maybe<(
    { __typename?: 'Coach' }
    & BasicUserFragment
  )> }
);

export const OutreachErrorFragmentDoc = gql`
    fragment OutreachError on OutreachFieldError {
  field
  message
}
    `;
export const BasicOutreachFragmentDoc = gql`
    fragment BasicOutreach on Outreach {
  id
  createdAt
  coachID
  studentID
  outreachDate
  type
  week
}
    `;
export const BasicOutreachResponseFragmentDoc = gql`
    fragment BasicOutreachResponse on OutreachResponse {
  errors {
    ...OutreachError
  }
  outreach {
    ...BasicOutreach
  }
}
    ${OutreachErrorFragmentDoc}
${BasicOutreachFragmentDoc}`;
export const MeetingErrorFragmentDoc = gql`
    fragment MeetingError on MeetingFieldError {
  field
  message
}
    `;
export const BasicMeetingFragmentDoc = gql`
    fragment BasicMeeting on Meeting {
  id
  createdAt
  coachID
  studentID
  meetingDate
  duration
  week
}
    `;
export const BasicMeetingResponseFragmentDoc = gql`
    fragment BasicMeetingResponse on MeetingResponse {
  errors {
    ...MeetingError
  }
  meeting {
    ...BasicMeeting
  }
}
    ${MeetingErrorFragmentDoc}
${BasicMeetingFragmentDoc}`;
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
  isCoordinator
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
  createdAt
  email
  firstName
  lastName
  population
  isActive
  meetingFrequency
  modeOfMeeting
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
export const CreateMeetingDocument = gql`
    mutation CreateMeeting($options: MeetingInput!) {
  createMeeting(options: $options) {
    ...BasicMeetingResponse
  }
}
    ${BasicMeetingResponseFragmentDoc}`;

export function useCreateMeetingMutation() {
  return Urql.useMutation<CreateMeetingMutation, CreateMeetingMutationVariables>(CreateMeetingDocument);
};
export const CreateOutreachDocument = gql`
    mutation CreateOutreach($options: OutreachInput!) {
  createOutreach(options: $options) {
    ...BasicOutreachResponse
  }
}
    ${BasicOutreachResponseFragmentDoc}`;

export function useCreateOutreachMutation() {
  return Urql.useMutation<CreateOutreachMutation, CreateOutreachMutationVariables>(CreateOutreachDocument);
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
export const AllMeetingsDocument = gql`
    query AllMeetings($options: PaginationInput!) {
  allMeetings(options: $options) {
    allMeetings {
      ...BasicMeeting
    }
  }
}
    ${BasicMeetingFragmentDoc}`;

export function useAllMeetingsQuery(options: Omit<Urql.UseQueryArgs<AllMeetingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllMeetingsQuery>({ query: AllMeetingsDocument, ...options });
};
export const AllOutreachDocument = gql`
    query AllOutreach($options: PaginationInput!) {
  allOutreach(options: $options) {
    allOutreach {
      ...BasicOutreach
    }
  }
}
    ${BasicOutreachFragmentDoc}`;

export function useAllOutreachQuery(options: Omit<Urql.UseQueryArgs<AllOutreachQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllOutreachQuery>({ query: AllOutreachDocument, ...options });
};
export const AllStudentsDocument = gql`
    query AllStudents($options: PaginationInput!) {
  allStudents(options: $options) {
    allStudents {
      ...BasicStudent
    }
  }
}
    ${BasicStudentFragmentDoc}`;

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