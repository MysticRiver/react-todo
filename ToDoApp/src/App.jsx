import "./App.css"
let todoList = [];
 todoList = [
  { title: 'Complete Assignment', completed: false, id: 1 },
  { title: 'Push to Github', completed: false,  id: 2 },
  { title: 'Schedule Mentor Session', completed: false,  id: 3 },
];

export default function App() {
  const listItems = todoList.map(todo =>
    <li
      key={todo.id}
     
    >
      {todo.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

