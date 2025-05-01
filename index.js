const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Import Routes
const itemRoutes = require("./src/routes/item.routes");
const storeRoutes = require("./src/routes/store.routes");
const userRoutes = require("./src/routes/user.routes");
const transactionRoutes = require("./src/routes/transaction.routes"); // ✅ Tambahkan transaksi routes

// Gunakan Routes
app.use("/item", itemRoutes);
app.use("/store", storeRoutes);
app.use("/user", userRoutes);
app.use("/transaction", transactionRoutes); // ✅ Tambahkan transaksi routes

// Jalankan Server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
