import React, { createContext, useState, useCallback, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const { mutate: onAdd } = useMutation({
    mutationFn: async (newTodo) => {
      const response = await fetch(TODO_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to add TODO");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      data.id = self.crypto.randomUUID().slice(-6);
      const updatedTodos = [...todos, data];
      setTodos(updatedTodos);
      updateLocalStorage(updatedTodos);
    },
    onError: (error) => {
      console.error("Error adding TODO:", error);
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationFn: async (todoId: string) => {
      const response = await fetch(`${TODO_API_URL}${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete TODO");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (todoId, data) => {
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
      updateLocalStorage(updatedTodos);
    },
    onError: (error) => {
      console.error("Error deleting TODO:", error);
    },
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      } else {
        fetch(TODO_API_URL_LIMIT).then(async (res) => {
          if (!res.ok) {
            throw new Error("failed to fetch");
          }
          const todoApiData = await res.json();
          setTodos(todoApiData);
          updateLocalStorage(todoApiData);
        });
      }
    },
  });

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
