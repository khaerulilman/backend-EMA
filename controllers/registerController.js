import bcrypt from "bcrypt";
import db from "../config/db.js";

export const registerController = async (req, res) => {
  try {
    // Mendapatkan data dari body request
    const { full_name, email, password, gender, no_telepon, domisili } =
      req.body;

    // Validasi input, pastikan semua field terisi
    if (
      !full_name ||
      !email ||
      !password ||
      !gender ||
      !no_telepon ||
      !domisili
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required", // Menampilkan pesan jika ada field yang kosong
      });
    }

    // Enkripsi password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Query untuk memasukkan data pengguna ke dalam database
    const query = `
        INSERT INTO schema_student.users (full_name, email, password, gender, no_telepon, domisili)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, created_at
      `;

    // Eksekusi query dengan data pengguna
    const result = await db.query(query, [
      full_name,
      email,
      hashedPassword,
      gender,
      no_telepon,
      domisili,
    ]);

    // Kirim respon sukses jika pengguna berhasil didaftarkan
    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error) {
    // Menangani error dan memberikan respon yang sesuai
    console.error("Registration error:", error);

    // Menangani error jika email sudah terdaftar
    if (error.code === "23505") {
      if (error.constraint.includes("email")) {
        return res.status(400).json({
          status: "error",
          message: "Email already exists", // Email sudah terdaftar
        });
      }
    }

    // Menangani error lain dan mengirimkan pesan error umum
    return res.status(500).json({
      status: "error",
      message: "Internal server error", // Error internal server
    });
  }
};
