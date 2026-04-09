import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { globalLimiter } from "./middleware/rateLimit.js";
import schoolRoutes from "./routes/schoolRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Apply global rate limiting to all incoming requests
app.use(globalLimiter);

app.use("/", schoolRoutes);

app.get("/", (req, res) => {
  res.send("School Management API is running");
});

const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});