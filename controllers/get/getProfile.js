import db from "../../config/db.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
                SELECT * 
                FROM schema_student.users 
                WHERE id = $1
            `;

    const result = await db.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
