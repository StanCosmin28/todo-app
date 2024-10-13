import { useEffect, useRef, useState } from "react";
import "../index.css";

export default function TODO({ item, todos, setTodos, onDelete }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  function handleComplete() {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
  }

  function handleDelete() {
    // onDelete();
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
    const updatedTodos = JSON.stringify(
      todos.filter((todo) => todo.id !== item.id)
    );
    localStorage.setItem("todos", updatedTodos);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
    setEditing(false);
  }

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();

      //cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  //handle edit
  function handleInputChange(e) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  }

  function handleInputBlur() {
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
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
            opacity: item.is_completed ? "0.4" : "1",
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
                    textDecoration: item.is_completed ? "line-through" : "none",
                  }}
                >
                  {item.title}
                </p>
              </div>
              <div className="todo-btns">
                {item.is_completed ? (
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
