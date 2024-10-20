import "../index.css";
import TODO from "./TODO";

export default function ToDoCard({ todos, setTodos, onDelete }) {
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
          todos?.map((item, index) => (
            <TODO
              key={index}
              item={item}
              todos={todos}
              setTodos={setTodos}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p>No todos added yet...</p>
        )}
      </ol>
    </>
  );
}
