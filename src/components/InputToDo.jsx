import "../index.css";

export default function InputToDo({ todos, setTodos, onAdd }) {
  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.todo.value;
    const newTodo = {
      title: value,
      id: self.crypto.randomUUID(),
      is_completed: false,
    };
    onAdd(setTodos((prevTodos) => [...prevTodos, newTodo]));
    // setTodos((prevTodos) => [...prevTodos, newTodo]);

    const updatedTodoList = JSON.stringify([...todos, newTodo]);
    // console.log(JSON.parse(updatedTodoList));
    localStorage.setItem("todos", updatedTodoList);

    e.target.reset();
  }

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="todo">
          <input type="text" name="todo" id="todo" placeholder="Input TODOs" />
          <button>+</button>
        </label>
      </form>
    </>
  );
}
