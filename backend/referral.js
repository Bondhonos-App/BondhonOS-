const admin = require("firebase-admin");
admin.initializeApp();

module.exports = async (req, res) => {
  const { userId, refCode } = req.body;
  const db = admin.firestore();

  try {
    const refUser = await db.collection("users").where("refCode","==", refCode).get();
    if(!refUser.empty) {
      // Add referral bonus logic
      await db.collection("referrals").add({
        userId,
        referrer: refCode,
        createdAt: new Date()
      });
      res.status(200).json({ message: "Referral added!" });
    } else {
      res.status(404).json({ message: "Referrer not found" });
    }
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};
