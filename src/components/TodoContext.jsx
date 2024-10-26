import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  function saveToLocalStorage(place, lsTodos) {
    localStorage.setItem(place, lsTodos);
  }
  const TODO_API_URL = "https://jsonplaceholder.typicode.com/todos/";
  const onAdd = async function addTodo(newTodo) {
    try {
      const response = await fetch(TODO_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();

      const completeTodo = {
        ...newTodo,
        id: self.crypto.randomUUID(),
        userId: data.id,
      };

      const updatedTodos = [...todos, completeTodo];
      setTodos(updatedTodos);

      return completeTodo;
    } catch (error) {
      console.error("Error adding TODO:", error);
    }
  };

  const onDelete = async function deleteTodo(todoId) {
    try {
      await fetch(`${TODO_API_URL}${todoId}`, {
        method: "DELETE",
      });
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      localStorage.setItem("todos", updatedTodos);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting TODO:", error);
    }
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const TODOS_NUMBER = 5;
  const TODO_API_URL_LIMIT = `https://jsonplaceholder.typicode.com/todos?_limit=${TODOS_NUMBER}`;

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const fetchTodos = async () => {
      try {
        if (!storedTodos || storedTodos.length === 0) {
          const response = await fetch(TODO_API_URL_LIMIT);
          const apiTodos = await response.json();
          if (storedTodos) {
            const localTodos = JSON.parse(storedTodos);

            const combinedTodos = [
              ...apiTodos,
              ...localTodos.filter((localTodo) => {
                return !apiTodos.some((apiTodo) => apiTodo.id === localTodo.id);
              }),
            ];

            setTodos(combinedTodos);
          } else {
            setTodos(apiTodos);
          }

          if (!storedTodos) {
            localStorage.setItem("todos", JSON.stringify(apiTodos));
          }
        }
      } catch (error) {
        console.error("Error fetching TODOs:", error);
      }
    };

    fetchTodos();
  }, []);

  function handleCompleteAll() {
    const allCompleted = todos.every((todo) => todo.completed);

    const updatedTodos = todos.map((todo) => {
      return { ...todo, completed: !allCompleted };
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleClearAll() {
    localStorage.removeItem("todos");
    setTodos([]);
  }
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        onAdd,
        onDelete,
        handleClearAll,
        handleCompleteAll,
        saveToLocalStorage,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
