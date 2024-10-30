import React from "react";
import { useContext } from "react";
import { TodoContext } from "./TodoContext";
import stanc from "../assets/stanc.png";

export default function ActionBtns() {
  const { todos, handleClearAll, handleCompleteAll } = useContext(TodoContext)!;
  return (
    <>
      <div>
        <img className="logo" src={stanc} alt="" />
      </div>
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
    </>
  );
}
