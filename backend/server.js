const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes);



app.use(errorHandler);

app.get("/", (req, res) => {
  return res.send("API is running...");
});

app.get("/test-auth", (req, res) => {
  res.send("Auth route working");
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("Failed to start server");
    process.exit(1);
  }
};

startServer();
