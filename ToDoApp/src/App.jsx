import "./App.css"
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

export default function App() {
  return (
    <div>
      <h1>My Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}


