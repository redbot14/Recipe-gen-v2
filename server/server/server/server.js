import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRouter from "./routes/recipe.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", recipeRouter);

app.get("/", (_req, res) => {
  res.json({ status: "SmartChef AI API is running 🍳" });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
