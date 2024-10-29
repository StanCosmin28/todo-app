import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const TODO_API_URL = "https://jsonplaceholder.typicode.com/todos/";
  const TODOS_NUMBER = 5;
  const TODO_API_URL_LIMIT = `https://jsonplaceholder.typicode.com/todos?_limit=${TODOS_NUMBER}`;

  const onAdd = useCallback(
    async (newTodo) => {
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
          userId: data.id,
        };
        setTodos([...todos, completeTodo]);
      } catch (error) {
        console.error("Error adding TODO:", error);
      }
    },
    [todos]
  );

  const onDelete = useCallback(
    async (todoId) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      try {
        await fetch(`${TODO_API_URL}${todoId}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error deleting TODO:", error);
      }
    },
    [todos]
  );

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      const fetchTodos = async () => {
        try {
          const response = await fetch(TODO_API_URL_LIMIT);
          const apiTodos = await response.json();
          setTodos(apiTodos);
          localStorage.setItem("todos", JSON.stringify(apiTodos));
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };
      fetchTodos();
    }
  }, []);

  const handleCompleteAll = useCallback(() => {
    const allCompleted = todos.every((todo) => todo.completed);

    const updatedTodos = todos.map((todo) => {
      return { ...todo, completed: !allCompleted };
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }, [todos]);

  const handleClearAll = useCallback(() => {
    localStorage.removeItem("todos");
    setTodos([]);
  }, []);

  function getTodos() {
    localStorage.setItem("todos", []);
    location.reload();
  }

  const contextValue = useMemo(
    () => ({
      todos,
      setTodos,
      onAdd,
      onDelete,
      handleClearAll,
      handleCompleteAll,
      getTodos,
    }),
    [
      todos,
      setTodos,
      onAdd,
      onDelete,
      handleClearAll,
      handleCompleteAll,
      getTodos,
    ]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}
