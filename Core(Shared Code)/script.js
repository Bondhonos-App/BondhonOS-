// Shared JS functions for all modules
export function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 20px;border-radius:5px;";
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}
