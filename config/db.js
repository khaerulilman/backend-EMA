import pg from "pg"; // Menggunakan default import
const { Pool } = pg; // Akses Pool dari objek `pg`

import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Successfully connected to Neon database");
    client.release();
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

testConnection();

export default pool;
