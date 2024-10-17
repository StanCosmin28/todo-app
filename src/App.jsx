import { useEffect, useState } from "react";
import "./App.css";
import InputToDo from "./components/InputToDo";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";

function App() {
  const [todos, setTodos] = useState([]);

  // POST: Add a new todo
  const onAdd = async function addTodo(newTodo) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        }
      );
      const data = await response.json();

      const completeTodo = {
        ...newTodo,
        id: self.crypto.randomUUID(),
        userId: data.id,
      };

      const updatedTodos = [...todos, completeTodo];
      setTodos(updatedTodos);

      // Save the updated todos to local storage
      saveToLocalStorage(updatedTodos);
      return completeTodo;
    } catch (error) {
      console.error("Error adding TODO:", error);
    }
  };

  // DELETE: Remove a todo
  const onDelete = async function deleteTodo(todoId) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: "DELETE",
      });
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Error deleting TODO:", error);
    }
  };

  // Retrieve todos from local storage when the page loads
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Fetch todos from the API if there are none in local storage
  const limit = 5;
  const url = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`;

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    //Fetch TODOS
    const fetchTodos = async () => {
      try {
        const response = await fetch(url);
        const apiTodos = await response.json();

        if (storedTodos) {
          const localTodos = JSON.parse(storedTodos);

          // Check and Filter for Duplicate TODOs
          const combinedTodos = [
            ...apiTodos,
            ...localTodos.filter((localTodo) => {
              return !apiTodos.some((apiTodo) => apiTodo.id === localTodo.id);
            }),
          ];

          setTodos(combinedTodos); //combined state
        } else {
          setTodos(apiTodos); //if no todos fetch data from API
        }

        // save to local storage if they are not
        if (!storedTodos) {
          localStorage.setItem("todos", JSON.stringify(apiTodos));
        }
      } catch (error) {
        console.error("Error fetching TODOs:", error);
      }
    };

    fetchTodos();
  }, []);

  // clear all the todos form the UI && localStorage
  function handleCompleteAll() {
    const allCompleted = todos.every((todo) => todo.is_completed); // check if all are completed

    const updatedTodos = todos.map((todo) => {
      return { ...todo, is_completed: !allCompleted };
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // Mark all todos as complete
  function handleClearAll() {
    localStorage.removeItem("todos");
    setTodos([]);
  }

  return (
    <>
      <img src="./asstes/stanc.png" alt="" />
      {todos && (
        <button style={{ margin: "8px" }} onClick={handleCompleteAll}>
          Complete All
        </button>
      )}
      {todos && (
        <button style={{ margin: "8px" }} onClick={handleClearAll}>
          Clear All
        </button>
      )}
      <Header />
      <div className="wrapper">
        <InputToDo todos={todos} setTodos={setTodos} onAdd={onAdd} />
        <ToDoList todos={todos} setTodos={setTodos} onDelete={onDelete} />
      </div>
    </>
  );
}

export default App;
