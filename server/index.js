// thêm "type": "module" để có thể xài cú pháp es module
// thay vì commonJs như require
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoute.js";
import { residencyRouter } from "./routes/residencyRoute.js";
import { reservationRouter } from "./routes/reservationRoutes.js";
import { ratingRouter } from "./routes/RatingRouter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRoute);
app.use("/api/user", residencyRouter);
app.use("/api/user", reservationRouter)
app.use("/api/user", ratingRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
