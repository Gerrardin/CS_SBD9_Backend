const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repositories");
const baseResponse = require("../utils/baseResponse.util");

// Fungsi Validasi Email
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Fungsi untuk Registrasi Pengguna
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validasi input
        if (!name || !email || !password) {
            return baseResponse(res, false, 400, "All fields are required!", null);
        }

        if (!validateEmail(email)) {
            return baseResponse(res, false, 400, "Invalid email format!", null);
        }

        if (password.length < 6) {
            return baseResponse(res, false, 400, "Password must be at least 6 characters long!", null);
        }

        // Hash password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan pengguna ke database
        const newUser = await userRepository.registerUser({
            name,
            email,
            password: hashedPassword,
        });

        baseResponse(res, true, 201, "User registered successfully", newUser);
    } catch (error) {
        console.error("Error in registerUser:", error);
        baseResponse(res, false, 500, "Failed to register user", null);
    }
};

// Fungsi untuk Login Pengguna
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validasi input
        if (!email || !password) {
            return baseResponse(res, false, 400, "Email and password are required!", null);
        }

        if (!validateEmail(email)) {
            return baseResponse(res, false, 400, "Invalid email format!", null);
        }

        // Ambil pengguna berdasarkan email
        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            return baseResponse(res, false, 401, "Invalid email or password", null);
        }

        // Bandingkan password request dengan hash di database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return baseResponse(res, false, 401, "Invalid email or password", null);
        }

        baseResponse(res, true, 200, "Login successful", {
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error("Error in loginUser:", error);
        baseResponse(res, false, 500, "Server error", null);
    }
};

// Fungsi untuk Memperbarui Data Pengguna
exports.updateUser = async (req, res) => {
    try {
        const { id, name, email, password, balance } = req.body;

        // Validasi email jika ada
        if (email && !validateEmail(email)) {
            return baseResponse(res, false, 400, "Invalid email format!", null);
        }

        // Hash password jika ada
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Perbarui pengguna di database
        const updatedUser = await userRepository.updateUser({
            id,
            name,
            email,
            password: hashedPassword,
            balance,
        });

        if (!updatedUser) {
            return baseResponse(res, false, 404, "User not found", null);
        }

        baseResponse(res, true, 200, "User updated successfully", updatedUser);
    } catch (error) {
        console.error("Error in updateUser:", error);
        baseResponse(res, false, 500, "Server error", null);
    }
};