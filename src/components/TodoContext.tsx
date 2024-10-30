import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onAdd: (newTodo: Todo) => void;
  onDelete: (todoId: string) => void;
  handleClearAll: () => void;
  handleCompleteAll: () => void;
  getTodos: () => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const TODO_API_URL: string = "https://jsonplaceholder.typicode.com/todos/";
  const TODOS_NUMBER: number = 5;
  const TODO_API_URL_LIMIT: string = `https://jsonplaceholder.typicode.com/todos?_limit=${TODOS_NUMBER}`;

  const updateLocalStorage = (todos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const onAdd = useCallback(
    async (newTodo: Todo) => {
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
        };
        const updatedTodos = [...todos, completeTodo];
        setTodos(updatedTodos);
        updateLocalStorage(updatedTodos);
        return data;
      } catch (error) {
        console.error("Error adding TODO:", error);
      }
    },
    [todos]
  );

  const onDelete = useCallback(
    async (todoId: string) => {
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
      updateLocalStorage(updatedTodos);

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
          updateLocalStorage(apiTodos);
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
  }, [todos]);

  const handleClearAll = useCallback(() => {
    localStorage.removeItem("todos");
    setTodos([]);
  }, []);

  function getTodos() {
    setTimeout(() => updateLocalStorage([]), 200);
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
};
