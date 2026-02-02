import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";


const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.set("trust proxy", 1);

app.use("/api/v1", routes);

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "OK", service: "SUVIDHA Backend" });
});

export default app;
