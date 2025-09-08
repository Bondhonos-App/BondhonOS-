import { showToast } from "../../core/script.js";

// Generate referral link (for demo purposes, normally comes from backend)
const userId = "USER123"; // replace with actual user ID from auth
const referralInput = document.getElementById("referralLink");
referralInput.value = `${window.location.origin}/signup?ref=${userId}`;

const copyBtn = document.getElementById("copyLink");
const shareBtn = document.getElementById("shareLink");
const statusMessage = document.getElementById("statusMessage");

// Copy referral link
copyBtn.addEventListener("click", () => {
    referralInput.select();
    referralInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(referralInput.value)
        .then(() => showToast("Referral link copied!"))
        .catch(() => showToast("Failed to copy link."));
});

// Share referral link (Web Share API)
shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Join BondhonOS!',
                text: 'Sign up using my referral link and earn rewards!',
                url: referralInput.value
            });
            showToast("Referral link shared successfully!");
        } catch (err) {
            showToast("Share cancelled or failed.");
        }
    } else {
        showToast("Your browser does not support sharing. Please copy the link manually.");
    }
});

// Send referral click to backend (optional)
async function notifyBackend(referralId) {
    try {
        const res = await fetch('/api/referral_verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ referralId })
        });
        const data = await res.json();
        statusMessage.textContent = data.message;
    } catch (err) {
        statusMessage.textContent = "Error notifying backend.";
    }
}

// Example: notify backend when page loads
// notifyBackend(userId);
