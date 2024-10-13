import "../index.css";
import TODO from "./TODO";

export default function ToDoCard({ todos, setTodos, onDelete }) {
  return (
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
  );
}
