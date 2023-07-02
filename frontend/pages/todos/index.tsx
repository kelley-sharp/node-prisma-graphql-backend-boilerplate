import { GetServerSideProps, NextPage } from "next";
import { getServerSideClient } from "src/shared/graphql/apollo-client";
import {
  FindAllTodosDocument,
  FindAllTodosQuery,
  Todo,
  useFindAllTodosLazyQuery,
} from "src/shared/graphql/generated";
import { CreateTodoForm } from "src/todos/components/create-todo-form";
import { TodoList } from "src/todos/components/todo-list";

type TodosIndexPageProps = {
  todosFromServer: Todo[];
};

const TodosIndexPage: NextPage<TodosIndexPageProps> = ({ todosFromServer }) => {
  const [findAllTodos, { data }] = useFindAllTodosLazyQuery({
    fetchPolicy: "network-only",
  });
  const todos =
    data?.todosList?.__typename === "QueryTodosListSuccess"
      ? data.todosList.todos
      : todosFromServer;
  return (
    <div className="h-screen flex justify-center m-[200px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-10">
        <div className="col-span-1">
          <CreateTodoForm findAllTodos={findAllTodos} />
        </div>
        <div className="col-span-1">
          <TodoList todos={todos} />
        </div>
      </div>
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

    return { props: { todosFromServer: data.todosList.todos } };
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
