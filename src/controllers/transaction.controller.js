const transactionRepository = require("../repositories/transaction.repositories");

// Fungsi untuk Membuat Transaksi
exports.createTransaction = async (req, res) => {
    try {
        const { item_id, quantity, user_id } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be larger than 0",
                payload: null,
            });
        }

        const transaction = await transactionRepository.createTransaction(item_id, quantity, user_id);

        res.status(201).json({
            success: true,
            message: "Transaction created",
            payload: transaction,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, payload: null });
    }
};

// Fungsi untuk Membayar Transaksi
exports.payTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await transactionRepository.payTransaction(id);

        if (!transaction) {
            return res.status(400).json({
                success: false,
                message: "Failed to pay",
                payload: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment successful",
            payload: transaction,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, payload: null });
    }
};

// Fungsi untuk Menghapus Transaksi
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await transactionRepository.deleteTransaction(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
                payload: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction deleted",
            payload: result,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, payload: null });
    }
};