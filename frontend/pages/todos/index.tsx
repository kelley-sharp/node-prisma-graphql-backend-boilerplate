import { GetServerSideProps, NextPage } from "next";
import { getServerSideClient } from "src/shared/graphql/apollo-client";
import {
  FindAllTodosDocument,
  FindAllTodosQuery,
  Todo,
} from "src/shared/graphql/generated";

type TodosIndexPageProps = {
  todos: Todo[];
};

const TodosIndexPage: NextPage<TodosIndexPageProps> = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <span key={todo.id}>{todo.title}</span>
      ))}
    </div>
  );
};

export default TodosIndexPage;

export const getServerSideProps: GetServerSideProps<
  TodosIndexPageProps
> = async (context) => {
  // fetch for your todos using apollo client
  const apolloClient = getServerSideClient();

  try {
    const { data } = await apolloClient.query<FindAllTodosQuery>({
      query: FindAllTodosDocument,
    });

    // at this point, we remove `| undefined` from the union type (narrowed)
    if (!data.todosList) {
      throw new Error("Query failed");
    }
    // at this point, it could either be `ApiError` | `QuerySuccess`
    //  so we have to narrow it to remove ApiError
    if (data.todosList.__typename === "ApiError") {
      throw new Error(data.todosList.errorMessage);
    }

    return { props: { todos: data.todosList.todos } };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};
