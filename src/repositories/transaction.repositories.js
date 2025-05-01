// filepath: src/repositories/transaction.repositories.js
const db = require("../database/pg.database");

exports.createTransaction = async (item_id, quantity, user_id) => {
    const query = `
        INSERT INTO transactions (item_id, quantity, user_id, total, status, created_at)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [item_id, quantity, user_id, quantity * 100000, "pending", new Date().toISOString()];

    const result = await db.query(query, values);
    return result.rows[0];
};

exports.payTransaction = async (id) => {
    const query = `
        UPDATE transactions SET status = 'paid' WHERE id = $1 AND status = 'pending' RETURNING *`;
    const result = await db.query(query, [id]);
    return result.rows[0];
};

exports.deleteTransaction = async (id) => {
    const query = `DELETE FROM transactions WHERE id = $1 RETURNING *`;
    const result = await db.query(query, [id]);
    return result.rows[0];
};