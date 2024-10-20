import { TodoProvider } from "./components/TodoContext";
import "./App.css";
import InputToDo from "./components/InputToDo";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";
import ActionBtns from "./components/ActionBtns";

function App() {
  return (
    <TodoProvider>
      <ActionBtns />
      <Header />
      <div className="wrapper">
        <InputToDo />
        <ToDoList />
      </div>
    </TodoProvider>
  );
}

export default App;
