// File: GoalItem.jsx

import { useState } from "react";

function GoalItem({ goal, onDelete, onDeposit }) {
  const [depositAmount, setDepositAmount] = useState("");

  const remaining = goal.targetAmount - goal.savedAmount;
  const progressPercent = Math.min(
    100,
    (goal.savedAmount / goal.targetAmount) * 100
  ).toFixed(1);

  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  const timeLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)); // in days

  const isOverdue = timeLeft < 0 && goal.savedAmount < goal.targetAmount;
  const isWarning =
    timeLeft <= 30 && timeLeft >= 0 && goal.savedAmount < goal.targetAmount;

  function handleDepositSubmit(e) {
    e.preventDefault();
    if (!depositAmount || isNaN(depositAmount)) return;
    onDeposit(goal.id, depositAmount);
    setDepositAmount("");
  }

  return (
    <div style={{ border: "1px solid gray", marginBottom: "1rem", padding: "1rem", borderRadius: "10px" }}>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: Ksh {goal.targetAmount}</p>
      <p>Saved: Ksh {goal.savedAmount}</p>
      <p>Remaining: Ksh {remaining}</p>
      <div style={{ background: "#eee", height: "15px", borderRadius: "10px", overflow: "hidden" }}>
        <div
          style={{
            width: `${progressPercent}%`,
            backgroundColor: progressPercent >= 100 ? "green" : "orange",
            height: "100%",
          }}
        />
      </div>
      <p>Progress: {progressPercent}%</p>
      <p>Deadline: {goal.deadline}</p>
      <p>
        {isOverdue
          ? "⚠️ Overdue!"
          : isWarning
          ? `⏳ ${timeLeft} days left!`
          : `✅ On track (${timeLeft} days left)`}
      </p>

      <form onSubmit={handleDepositSubmit} style={{ marginTop: "0.5rem" }}>
        <input
          type="number"
          placeholder="Deposit amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button type="submit">Deposit</button>
      </form>

      <button
        onClick={() => onDelete(goal.id)}
        style={{ marginTop: "0.5rem", background: "red", color: "white" }}
      >
        Delete Goal
      </button>
    </div>
  );
}

export default GoalItem;
