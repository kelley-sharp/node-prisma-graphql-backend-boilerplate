import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: number; output: number };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
};

export type ApiError = {
  __typename: "ApiError";
  errorMessage: Scalars["String"]["output"];
  errorType: ApiErrorType;
};

export enum ApiErrorType {
  BadRequest = "BAD_REQUEST",
  Conflict = "CONFLICT",
  Forbidden = "FORBIDDEN",
  ForeignKeyConstraint = "FOREIGN_KEY_CONSTRAINT",
  NotFound = "NOT_FOUND",
  Unauthorized = "UNAUTHORIZED",
  Unhandled = "UNHANDLED",
}

export type Mutation = {
  __typename: "Mutation";
  createTodo: MutationCreateTodoResult;
  deleteTodo: MutationDeleteTodoResult;
  updateTodo: MutationUpdateTodoResult;
};

export type MutationCreateTodoArgs = {
  input: TodoInput;
};

export type MutationDeleteTodoArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationUpdateTodoArgs = {
  id: Scalars["Int"]["input"];
  input: TodoInput;
};

export type MutationCreateTodoResult = ApiError | Todo;

export type MutationDeleteTodoResult = ApiError | Todo;

export type MutationUpdateTodoResult = ApiError | Todo;

export type Query = {
  __typename: "Query";
  todo?: Maybe<QueryTodoResult>;
  todosList?: Maybe<QueryTodosListResult>;
};

export type QueryTodoArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryTodoResult = ApiError | Todo;

export type QueryTodosListResult = ApiError | QueryTodosListSuccess;

export type QueryTodosListSuccess = {
  __typename: "QueryTodosListSuccess";
  todos: Array<Todo>;
};

export type Todo = {
  __typename: "Todo";
  content?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type TodoInput = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type FindAllTodosQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllTodosQuery = {
  __typename: "Query";
  todosList?:
    | { __typename: "ApiError"; errorMessage: string; errorType: ApiErrorType }
    | {
        __typename: "QueryTodosListSuccess";
        todos: Array<{
          __typename: "Todo";
          content?: string | null;
          createdAt: string;
          id: number;
          title: string;
          updatedAt: string;
        }>;
      }
    | null;
};

export const FindAllTodosDocument = gql`
  query findAllTodos {
    todosList {
      ... on ApiError {
        __typename
        errorMessage
        errorType
      }
      ... on QueryTodosListSuccess {
        __typename
        todos {
          content
          createdAt
          id
          title
          updatedAt
        }
      }
    }
  }
`;

/**
 * __useFindAllTodosQuery__
 *
 * To run a query within a React component, call `useFindAllTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllTodosQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindAllTodosQuery,
    FindAllTodosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAllTodosQuery, FindAllTodosQueryVariables>(
    FindAllTodosDocument,
    options
  );
}
export function useFindAllTodosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllTodosQuery,
    FindAllTodosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindAllTodosQuery, FindAllTodosQueryVariables>(
    FindAllTodosDocument,
    options
  );
}
export type FindAllTodosQueryHookResult = ReturnType<
  typeof useFindAllTodosQuery
>;
export type FindAllTodosLazyQueryHookResult = ReturnType<
  typeof useFindAllTodosLazyQuery
>;
export type FindAllTodosQueryResult = Apollo.QueryResult<
  FindAllTodosQuery,
  FindAllTodosQueryVariables
>;
