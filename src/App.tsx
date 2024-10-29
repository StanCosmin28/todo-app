import { TodoProvider } from "./components/TodoContext";
import "./App.css";
import InputToDo from "./components/InputTodo";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import ActionBtns from "./components/ActionBtns";

function App() {
  return (
    <TodoProvider>
      <ActionBtns />
      <Header />
      <div className="wrapper">
        <InputToDo />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
