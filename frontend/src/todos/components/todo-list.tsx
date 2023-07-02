import { Todo } from "src/shared/graphql/generated";
import { TodoItem } from "src/todos/components/todo-item";

type TodoListProps = {
  todos: Todo[];
};

export function TodoList({ todos }: TodoListProps) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
