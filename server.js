import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

/* ----------------------------------
   🔥 CORS Setup
---------------------------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-checkmood-frontend.vercel.app"
    ],
    credentials: true
  })
);

/* ----------------------------------
   JSON Middleware
---------------------------------- */
app.use(express.json());

/* ----------------------------------
   MongoDB Connect + Start Server
---------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => console.log("Mongo Error:", err));