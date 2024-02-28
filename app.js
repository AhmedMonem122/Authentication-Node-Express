const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRouter");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());

// console.log(process.env.NODE_ENV);
// console.log(process.env.NODE_ENV.trim() === "production");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
