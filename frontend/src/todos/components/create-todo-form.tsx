import { useState } from "react";
import { useCreateTodoMutation } from "src/shared/graphql/generated";

type TodoState = {
  title: string;
  content: string;
};

type CreateTodoFormProps = {
  findAllTodos(): void;
};

export function CreateTodoForm({ findAllTodos }: CreateTodoFormProps) {
  const [newTodo, setNewTodo] = useState<TodoState>({ title: "", content: "" });
  const [createTodo] = useCreateTodoMutation();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await createTodo({
            variables: { title: newTodo.title, content: newTodo.content },
          });
          setNewTodo({ title: "", content: "" });
          findAllTodos();
        } catch (error) {
          alert(error.message);
        }
      }}
    >
      <div className="grid grid-cols-1 gap-3 w-[600px]">
        <label htmlFor="title" className="col-span-1">
          Title
        </label>
        <input
          type="text"
          value={newTodo.title}
          name="title"
          id="title"
          onChange={(e) =>
            setNewTodo({ title: e.target.value, content: newTodo.content })
          }
          className="col-span-1 border py-2 px-4 rounded w-full"
        />
        <label htmlFor="content" className="col-span-1">
          Note
        </label>
        <textarea
          value={newTodo.content}
          name="content"
          id="content"
          onChange={(e) =>
            setNewTodo({ title: newTodo.title, content: e.target.value })
          }
          className="col-span-1 border min-h-[100px] py-2 px-4 rounded"
        />
        <div className="col-span-1">
          <button className="mt-10 hover:bg-gray-100 py-2 px-4 border border-gray-300 rounded shadow">
            Add Todo
          </button>
        </div>
      </div>
    </form>
  );
}
