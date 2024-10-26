import { useContext, useEffect, useRef, useState } from "react";
import "../index.css";
import { TodoContext } from "./TodoContext";

export default function TODO({ item }) {
  const { todos, setTodos, saveToLocalStorage } = useContext(TodoContext);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  function handleComplete() {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    const updatedTodos = JSON.stringify(todos);
    saveToLocalStorage("todos", updatedTodos);
  }

  function handleDelete() {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
    const updatedTodos = JSON.stringify(
      todos.filter((todo) => todo.id !== item.id)
    );
    localStorage.setItem("todos", updatedTodos);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    const updatedTodos = JSON.stringify(todos);
    saveToLocalStorage("todos", updatedTodos);
    setEditing(false);
  }

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  function handleInputChange(e) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  }

  function handleInputBlur() {
    const updatedTodos = JSON.stringify(todos);
    saveToLocalStorage("todos", updatedTodos);
    setEditing(false);
  }

  function handleEdit() {
    setEditing(true);
  }

  return (
    <>
      {item.title && (
        <li
          key={item?.id}
          style={{
            opacity: item.completed ? "0.4" : "1",
          }}
        >
          {editing ? (
            <form className="edit-todo" onSubmit={handleEditSubmit}>
              <label htmlFor="edit-todo">
                <input
                  ref={inputRef}
                  type="text"
                  name="edit-todo"
                  id="edit-todo"
                  defaultValue={item?.title}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                />
              </label>
            </form>
          ) : (
            <>
              <div className="left" onClick={handleComplete}>
                <button className="checkbox-btn">
                  <input type="checkbox" />
                </button>
                <p
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.title}
                </p>
              </div>
              <div className="todo-btns">
                {item.completed ? (
                  ""
                ) : (
                  <button onClick={handleEdit}>
                    <span>Edit</span>
                  </button>
                )}

                <button onClick={handleDelete}>
                  <span>Delete</span>
                </button>
              </div>
            </>
          )}
        </li>
      )}
    </>
  );
}
