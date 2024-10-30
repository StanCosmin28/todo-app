import React, { useCallback, useContext } from "react";
import { TodoContext } from "./TodoContext";
import "../index.css";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function InputToDo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("InputToDo must be used within a TodoProvider");
  }

  const { todos, setTodos, onAdd } = context;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const target = e.currentTarget;
      const value = target.elements.namedItem("todo") as HTMLInputElement;

      if (!value || value.value.trim() === "") {
        alert("Please enter a valid TODO!");
        return;
      }

      const newTodo: Todo = {
        id: self.crypto.randomUUID().slice(-6),
        title: value.value.trim(),
        completed: false,
      };

      onAdd(newTodo);

      // const updatedTodoList = [...todos, newTodo];
      // localStorage.setItem("todos", JSON.stringify(updatedTodoList));

      // setTodos(updatedTodoList);

      target.reset();
    },
    [todos, onAdd, setTodos]
  );

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input type="text" name="todo" id="todo" placeholder="Input TODOs" />
        <button type="submit">+</button>
      </label>
    </form>
  );
}
