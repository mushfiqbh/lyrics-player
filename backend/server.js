import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import catalogRouter from "./routes/catalogRoute.js";


// app config
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// database connection
connectDB();

// api endpoint
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter);
app.use('/api/post', postRouter);
app.use('/api/catalog', catalogRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
