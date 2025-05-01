const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

// Rute untuk membuat transaksi
router.post("/create", transactionController.createTransaction);

// Rute untuk membayar transaksi
router.post("/pay/:id", transactionController.payTransaction);

// Rute untuk menghapus transaksi
router.delete("/delete/:id", transactionController.deleteTransaction);

module.exports = router;