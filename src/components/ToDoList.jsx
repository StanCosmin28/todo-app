import "../index.css";
import TODO from "./TODO";

export default function ToDoCard({ todos, setTodos }) {
  return (
    <ol className="todo-list">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => (
          <TODO key={index} item={item} todos={todos} setTodos={setTodos} />
        ))
      ) : (
        <p>No todos added yet...</p>
      )}
    </ol>
  );
}
