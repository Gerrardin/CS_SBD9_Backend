const db = require("../database/pg.database");

// filepath: src/repositories/user.repositories.js
const bcrypt = require("bcrypt");

exports.registerUser = async (user) => {
    try {
        const res = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [user.name, user.email, user.password] // password sudah di-hash di controller
        );
        return res.rows[0];
    } catch (error) {
        console.error("Failed to register user", error);
        throw error;
    }
};


exports.loginUser = async (email, password) => {
    try {
        const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = res.rows[0];

        if (user && await bcrypt.compare(password, user.password)) { // Validasi password
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Failed to login user", error);
        throw error;
    }
};

// Dapatkan pengguna berdasarkan email
exports.getUserByEmail = async (email) => {
    try {
        const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

// Dapatkan pengguna berdasarkan ID
exports.getUserById = async (id) => {
    try {
        const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        return res.rows[0];
    } catch (error) {
        console.error("Failed to get user by ID", error);
        throw error;
    }
};

exports.updateUser = async (userData) => {
    try {
        console.log("🔍 Updating user:", userData.email);  // Debug log

        const res = await db.query(
            "UPDATE users SET name = $1, email = $2, password = $3, balance = $4 WHERE id = $5 RETURNING *",
            [userData.name, userData.email, userData.password, userData.balance, userData.id]
        );

        console.log("📝 Query result:", res.rows);  // Debug result

        if (res.rowCount === 0) {
            return null;  // Jika tidak ada user yang diperbarui
        }

        return res.rows[0];  // Kembalikan user yang diperbarui
    } catch (error) {
        console.error("Failed to update user", error);
        throw error;
    }
};

exports.deleteUser = async (id) => {
    try {
        console.log("🔍 Deleting user with ID:", id);  // Debugging log

        const res = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

        console.log("📝 Query result:", res.rows);  // Debugging log

        if (res.rowCount === 0) {
            return null;  // Jika tidak ada user yang dihapus
        }

        return res.rows[0];  // Kembalikan user yang dihapus
    } catch (error) {
        console.error("Failed to delete user", error);
        throw error;
    }
};

