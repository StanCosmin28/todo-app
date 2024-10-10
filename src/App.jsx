import { useEffect, useState } from "react";
import "./App.css";
import InputToDo from "./components/InputToDo";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";

function App() {
  //  //POST
  //  const newTodo = {
  //   title: "New Task STAN COSMIN",
  //   completed: false,
  //   userId: 1,
  // };

  // async function addTodo(newTodo) {
  //   try {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newTodo),
  //       }
  //     );
  //     const data = await response.json();
  //     setTodo((t) => [...t, data]);
  //     console.log("TODO added:", data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error adding TODO:", error);
  //   }
  // }
  // //POST

  // //DELETE

  // async function deleteTodo(todoId) {
  //   try {
  //     await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
  //       method: "DELETE",
  //     });
  //     console.log("TODO deleted");
  //     const updatedTasks = todo.filter((_, index) => index !== todoId);
  //     setTodo(updatedTasks);
  //   } catch (error) {
  //     console.error("Error deleting TODO:", error);
  //   }
  // }

  // //DELETE

  const [todos, setTodos] = useState([]);

  /* retrive data from local storage
  when todos are not fetched from the API */
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  //get n todos from the placeholder API
  // const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";

  // useEffect(() => {
  //   async function getTodos() {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setTodos(data);
  //   }
  //   getTodos();
  // }, []);

  function handleCompleteAll() {
    setTodos("");
  }
  return (
    <>
      {todos && <button onClick={handleCompleteAll}>Complete All</button>}
      <Header />
      <div className="wrapper">
        <InputToDo todos={todos} setTodos={setTodos} />
        <ToDoList todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
}

export default App;
