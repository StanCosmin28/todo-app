import { useContext } from "react";
import { TodoContext } from "./TodoContext";
import "../index.css";

export default function InputToDo() {
  const { todos, setTodos, onAdd } = useContext(TodoContext);

  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.todo.value.trim();

    if (value === "") {
      alert("Please enter a valid TODO!");
      return;
    }

    const newTodo = {
      title: value,
      id: self.crypto.randomUUID(),
      completed: false,
    };

    onAdd(newTodo);

    const updatedTodoList = [...todos, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodoList));

    setTodos(updatedTodoList);

    e.target.reset();
  }

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="todo">
          <input type="text" name="todo" id="todo" placeholder="Input TODOs" />
          <button type="submit">+</button>
        </label>
      </form>
    </>
  );
}
