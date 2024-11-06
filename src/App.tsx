import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { TodoProvider } from "./components/TodoContext";
import "./App.css";
import InputToDo from "./components/InputTodo";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import ActionBtns from "./components/ActionBtns";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TodoProvider>
        <ActionBtns />
        <Header />
        <div className="wrapper">
          <InputToDo />
          <TodoList />
        </div>
      </TodoProvider>
    </QueryClientProvider>
  );
}

export default App;
