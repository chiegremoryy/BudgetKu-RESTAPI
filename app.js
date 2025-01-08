require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const authHandler = require("./routes/authRoute");
const pemasukanHandler = require("./routes/pemasukanRoute");
const pengeluaranHandler = require("./routes/pengeluaranRoute");
const saldoHandler = require("./routes/saldoRoute");
const saldoWeekHandler = require("./routes/saldoweekRoute");
const verifyToken = require("./middleware/verifyToken");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Welcome to BudgetKu API",
    endpoints: [
      "/api/auth",
      "/api/pemasukan",
      "/api/pengeluaran",
      "/api/total",
      "/api/weekly",
    ],
    serverTime: new Date(Date.now()).toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    }),
  });
});


app.use("/api/auth", authHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/pemasukan", verifyToken, pemasukanHandler);
app.use("/api/pengeluaran", verifyToken, pengeluaranHandler);
app.use("/api/total", verifyToken, saldoHandler);
app.use("/api/weekly", verifyToken, saldoWeekHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
