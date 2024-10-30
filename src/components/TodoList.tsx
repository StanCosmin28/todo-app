import React from "react";
import "../index.css";
import Todo from "./Todo";
import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export default function TodoCard() {
  const { todos, getTodos } = useContext(TodoContext)!;
  const MIN_TODOS = 4;
  return (
    <>
      {todos.every((todo) => todo.completed === true) &&
      todos.length > MIN_TODOS ? (
        <p>Greate Work! You finished all your todos</p>
      ) : (
        <p>You have some tasks waiting for you...</p>
      )}
      <ol className="todo-list">
        {todos && todos.length > 0 ? (
          todos?.map((item, index) => <Todo key={index} item={item} />)
        ) : (
          <>
            <p>No todos added yet...</p>
            <button onClick={getTodos}>Get Todos</button>
          </>
        )}
      </ol>
    </>
  );
}
