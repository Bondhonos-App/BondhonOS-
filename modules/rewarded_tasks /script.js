import { showToast } from "../../core/script.js";

document.getElementById('completeTask').addEventListener('click', async () => {
    try {
        const res = await fetch('/api/reward_verification', { method: 'POST' });
        const data = await res.json();
        showToast(data.message);
    } catch(e) {
        showToast('Error completing task.');
    }
});
