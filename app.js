import express from "express";
import cors from "cors";
import journalRoutes from "./routes/journalRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
res.send("MindTrack Backend Running...");
});

app.use("/api/journal", journalRoutes);

export default app;