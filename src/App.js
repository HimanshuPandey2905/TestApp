import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const BASE_URL = "http://localhost:56617/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [count, setCount] = useState(0);
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos`);
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      alert("Error fetching todos");
    }
  };
  const addTodo = async () => {
    const payload = {
      id: count,
      title: todo,
    };
    try {
      await axios.post(`${BASE_URL}/todos`, payload);
      setCount((prev) => prev + 1);
      setTodo(""); // Clear the input field
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/todos/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };
  const handleChangeInput = (e) => {
    setTodo(e.target.value);
  };
  useEffect(() => {
    fetchTodos();
  }, [, todos]);
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          placeholder="type..."
          value={todo}
          onChange={handleChangeInput}
        />
        <button type="submit">+</button>
      </form>
      <ul className="todo-container">
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.title}</p>
            <button onClick={() => handleDelete(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
