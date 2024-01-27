import express, { Request, Response, Application } from "express";
import cors from "cors";
import cookeParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
// @ts-ignore
import helmet from "helmet";
import connectDB from "./config/dbConfig";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cookeParser("mySecret"));
app.use(helmet());

// ENV configuration
dotenv.config();

// CORS handling
app.use(cors({ credentials: true, origin: "*" }));

// Connect to DB
connectDB();

// Routes
app.use("/api/v1", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Don't try to hack me!");
});

const port: number | string = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
