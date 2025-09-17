import { useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Daily Check-in", reward: 5, done: false },
    { id: 2, title: "Watch a Video", reward: 10, done: false }
  ]);
  const [wallet, setWallet] = useState(0);

  const completeTask = (id, reward) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));
    setWallet(wallet + reward);
  };

  return (
    <div>
      <h2>Wallet: ${wallet}</h2>
      {tasks.map(t => (
        <div key={t.id}>
          {t.title} - {t.reward} points
          {!t.done && <button onClick={() => completeTask(t.id, t.reward)}>Complete</button>}
          {t.done && <span> ✅ Done</span>}
        </div>
      ))}
    </div>
  );
}
