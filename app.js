require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authHandler = require("./routes/authRoute");
const pemasukanHandler = require("./routes/pemasukanRoute");
const pengeluaranHandler = require("./routes/pengeluaranRoute");
const saldoHandler = require("./routes/saldoRoute");
const saldoWeekHandler = require("./routes/saldoweekRoute");
const verifyToken = require("./middleware/verifyToken");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

// Root route
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Welcome to BudgetKu API",
    endpoints: [
      "/api/auth",
      "/api/pemasukan",
      "/api/pengeluaran",
      "/api/saldo",
      "/api/total", // Endpoint untuk saldo total
      "/api/weekly", // Added weekly saldo endpoint
    ],
    serverTime: new Date(Date.now()).toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    }),
  });
});

// Routes
app.use("/api/auth", authHandler);
app.use("/api/pemasukan", verifyToken, pemasukanHandler);
app.use("/api/pengeluaran", verifyToken, pengeluaranHandler);

// Routes untuk saldo total
app.use("/api/total", verifyToken, saldoHandler); // Total saldo route

// Routes untuk saldo mingguan
app.use("/api/weekly", verifyToken, saldoWeekHandler); // Weekly saldo route

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
