import { ChangeEvent, useState } from "react";
import { Todo, useUpdateTodoMutation } from "src/shared/graphql/generated";
import classNames from "classnames";

type TodoProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoProps) {
  const [updateTodo] = useUpdateTodoMutation();
  const [isChecked, setIsChecked] = useState<boolean>(
    Boolean(todo.completedAt)
  );

  const handleUpdateTodo = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsChecked(event.target.checked);
      await updateTodo({
        variables: {
          id: todo.id,
          input: {
            completedAt: event.target.checked ? new Date() : null,
          },
        },
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex">
      <input
        id={`todo-${todo.id}`}
        type="checkbox"
        onChange={handleUpdateTodo}
        checked={isChecked}
        className={classNames("mr-8 my-2")}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={classNames("text-amber-900", {
          "line-through text-gray-400": isChecked,
        })}
      >
        {todo.title}
      </label>
    </div>
  );
}
