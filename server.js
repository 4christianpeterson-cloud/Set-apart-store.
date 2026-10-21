const express = require("express");
const Stripe = require("stripe");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PRODUCTS = {
  hoodie: { name: "Core Logo Hoodie", price: 5499 },
  jesus_tee: { name: "Jesus Changes Everything Tee", price: 3299 },
  not_world: { name: "Not of This World Tee", price: 3499 },
  sweatpants: { name: "Core Logo Sweatpants", price: 4499 },
  shorts: { name: "Set Apart Training Shorts", price: 2999 },
  crown_hat: { name: "Core Logo Cap", price: 2499 },
  beanie: { name: "Set Apart Beanie", price: 2299 },
  sneaker: { name: "Set Apart Street Sneaker", price: 6999 }
};

app.get("/api/products", (_req, res) => {
  res.json(Object.entries(PRODUCTS).map(([id, p]) => ({ id, ...p })));
});

app.post("/api/checkout", async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({
      error: "Checkout isn't connected yet. The store owner must add a Stripe secret key to the hosting environment."
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const items = req.body && Array.isArray(req.body.items) ? req.body.items : [];
  if (!items.length) return res.status(400).json({ error: "Your cart is empty." });

  const line_items = [];
  for (const item of items) {
    const product = PRODUCTS[item.id];
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return res.status(400).json({ error: "One of the cart items is invalid." });
    }
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: product.name },
        unit_amount: product.price
      },
      quantity
    });
  }

  try {
    const origin = `${req.protocol}://${req.get("host")}`;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/?order=success`,
      cancel_url: `${origin}/?order=cancelled`,
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["US"] },
      phone_number_collection: { enabled: false }
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error.message);
    res.status(500).json({ error: "Checkout could not start. Check the Stripe setup and try again." });
  }
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, () => console.log(`SET APART store running on port ${PORT}`));
