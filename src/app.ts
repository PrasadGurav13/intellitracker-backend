import express from "express";
import cors from "cors";
import rootRouter from "./routes";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express();
const PORT = process.env["PORT"];
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', rootRouter);
app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

app.use(globalErrorHandler);
export default app;
