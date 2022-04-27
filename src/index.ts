import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user";

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // console.log(origin);
    const isWhiteList = origin === undefined;
    if (isWhiteList) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  credentials: true,
};

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000 || 5001;

mongoose
  .connect(
    process.env.CONNECTION_URL as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`[rest-api]: Bot rest-api is running at PORT ${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
