

import { useEffect, useState } from 'react';
import Form1 from './Form1';
import GoalItem from './GoalItem';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  function fetchGoals() {
    fetch("http://localhost:3000/goals")
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch(err => console.error("Fetch error:", err));
  }

  function handleDelete(id) {
    fetch(`http://localhost:3000/goals/${id}`, { method: "DELETE" })
      .then(() => fetchGoals());
  }

  function handleDeposit(id, amount) {
    const goal = goals.find(g => g.id === id);
    const updatedAmount = parseFloat(goal.savedAmount) + parseFloat(amount);

    fetch(`http://localhost:3000/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedAmount })
    }).then(() => fetchGoals());
  }

  const totalSaved = goals.reduce((sum, g) => sum + Number(g.savedAmount), 0);
  const completed = goals.filter(g => Number(g.savedAmount) >= Number(g.targetAmount)).length;

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>

      <Form1 onSuccess={fetchGoals} />

      <section>
        <h2>Overview</h2>
        <p>Total Goals: {goals.length}</p>
        <p>Total Saved: Ksh {totalSaved}</p>
        <p>Goals Completed: {completed}</p>
      </section>

      <section>
        <h2>Goals</h2>
        {goals.map(goal => (
          <GoalItem key={goal.id} goal={goal} onDelete={handleDelete} onDeposit={handleDeposit} />
        ))}
      </section>
    </div>
  );
}

export default App;