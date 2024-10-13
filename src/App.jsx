import { useEffect, useState } from "react";
import "./App.css";
import InputToDo from "./components/InputToDo";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";

function App() {
  const [todos, setTodos] = useState([]);
  //  //POST
  //  const newTodo = {
  //   title: "New Task STAN COSMIN",
  //   completed: false,
  //   userId: 1,
  // };

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
      // setTodos((t) => [...t, data]);

      //save it to local storage
      //....
      // console.log("TODO added:", data);
      return data;
    } catch (error) {
      console.error("Error adding TODO:", error);
    }
  };
  // //POST

  // //DELETE

  const onDelete = async function deleteTodo(todoId) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: "DELETE",
      });
      console.log("TODO deleted", todoId);
      const updatedTasks = todos.filter((_, index) => index !== todoId);
      setTodos(updatedTasks);
    } catch (error) {
      console.error("Error deleting TODO:", error);
    }
  };

  // //DELETE

  /* retrive data from local storage
  when todos are not fetched from the API */
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  //get n todos from the placeholder API
  const url = "https://jsonplaceholder.typicode.com/todos?_limit=10";

  useEffect(() => {
    async function getTodos() {
      const response = await fetch(url);
      const data = await response.json();
      setTodos(data);
    }

    getTodos();
  }, []);

  function handleCompleteAll() {
    setTodos("");
    const updatedTodos = [];
    localStorage.setItem("todos", updatedTodos);
  }
  return (
    <>
      {todos && <button onClick={handleCompleteAll}>Complete All</button>}
      <Header />
      <div className="wrapper">
        <InputToDo todos={todos} setTodos={setTodos} onAdd={onAdd} />
        <ToDoList todos={todos} setTodos={setTodos} onDelete={onDelete} />
      </div>
    </>
  );
}

export default App;
