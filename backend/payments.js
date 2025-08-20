const stripe = require("stripe")("YOUR_STRIPE_SECRET_KEY");

module.exports = async (req, res) => {
  if(req.method === "POST") {
    const { email, amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        receipt_email: email
      });
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch(err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
