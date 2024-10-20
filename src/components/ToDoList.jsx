import "../index.css";
import TODO from "./TODO";
import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export default function ToDoCard() {
  const { todos, setTodos, onDelete } = useContext(TodoContext);
  const minTodos = 4;
  return (
    <>
      {todos.every((todo) => todo.is_completed === true) &&
      todos.length > minTodos ? (
        <p>Greate Work! You finished all your todos</p>
      ) : (
        <p>You have some tasks waiting for you...</p>
      )}
      <ol className="todo-list">
        {todos && todos.length > 0 ? (
          todos?.map((item, index) => <TODO key={index} item={item} />)
        ) : (
          <p>No todos added yet...</p>
        )}
      </ol>
    </>
  );
}
