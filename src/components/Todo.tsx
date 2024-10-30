import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "../index.css";
import { TodoContext } from "./TodoContext";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId?: number;
}

interface TodoProps {
  item: Todo;
}

export default function Todo({ item }: TodoProps) {
  const { todos, setTodos } = useContext(TodoContext);
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleComplete = useCallback(() => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [todo.id, todos]);

  const handleDelete = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
  }, [todo.id, todos]);

  const handleEditSubmit = useCallback((e) => {
    e.preventDefault();
    setEditing(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  }, []);

  const exitEditMode = useCallback(() => {
    setEditing(false);
  });

  const handleEdit = useCallback(() => {
    setEditing(true);
  });

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const listItemStyle = useMemo(
    () => ({
      border: item.completed
        ? "1px solid rgba(172, 255, 47, 0.2)"
        : "1px solid rgba(172, 255, 47, 0.4)",
    }),
    [item.completed]
  );

  const paragraphTextDecoration = useMemo(
    () => ({
      opacity: item.completed ? "0.3" : "1",
      textDecoration: item.completed ? "line-through" : "none",
    }),
    [item.completed]
  );

  return (
    <>
      {item.title && (
        <li key={item.id} style={listItemStyle}>
          {editing ? (
            <form className="edit-todo" onSubmit={handleEditSubmit}>
              <label htmlFor="edit-todo">
                <input
                  ref={inputRef}
                  type="text"
                  name="edit-todo"
                  id="edit-todo"
                  defaultValue={item.title}
                  onBlur={exitEditMode}
                  onChange={handleInputChange}
                />
              </label>
            </form>
          ) : (
            <>
              <div className="left" onClick={handleComplete}>
                <button className="checkbox-btn">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    style={paragraphTextDecoration}
                    readOnly
                  />
                </button>
                <p style={paragraphTextDecoration}>{item.title}</p>
              </div>
              <div className="todo-btns">
                {!item.completed && (
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
