import React, { useState, useEffect } from 'react'

const App = () => {
  const [todo, setTodo] = useState([
    { id: 1, title: "Revise React basics", completed: false },
    { id: 2, title: "Practice useState", completed: false },
    { id: 3, title: "Understand useEffect", completed: false },
    { id: 4, title: "Revise useRef", completed: false }
  ]);

  const [completedCount, setCompletedCount] = useState(0);

  const toggleEvent = (id) => {
    setTodo((prev) => {
      return prev.map((item) =>
        item.id == id ? { ...item, completed: !item.completed } : item)
    })
  }

  const countCompleted = () => {
    const count = todo.filter(item => item.completed).length;
    setCompletedCount(count);
  }

  useEffect(() => {
    countCompleted();
  }, [todo]);

  return (
    <div>
      <h1>Todo List</h1>
      <p>Completed Tasks: {completedCount}</p>
      <ul>
        {todo.map(item => (
          <li key={item.id}>
            {item.title}
            <input type="checkbox" checked={item.completed} readOnly />
            <button onClick={() => toggleEvent(item.id)}>{item.completed ? 'Undo' : 'Done'}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App