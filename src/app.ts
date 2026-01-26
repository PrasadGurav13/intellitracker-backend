import express from "express";
import cors from "cors";
import { loginController } from "./controllers/auth.controller";
import authRouter from "./routes/auth.route";

const app = express();
const PORT = process.env["PORT"];
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);
app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

export default app;
