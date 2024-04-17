// src/apiClient.js
import axios from 'axios';
const BASE_URI = 'http://localhost:5000';
const client = axios.create({
  baseURL: BASE_URI,
  json: true
});
class APIClient {
  constructor() {}
  getTodos() {
    return client.get('/todos');
  }
  createTodo(todo) {
    return client.post('/todos', todo);
  }
  updateTodo(todoId, updatedTodo) {
    return client.put(`/todos/${todoId}`, updatedTodo);
  }
  deleteTodo(todoId) {
    return client.delete(`/todos/${todoId}`);
  }
}
export default new APIClient();

// changes in client