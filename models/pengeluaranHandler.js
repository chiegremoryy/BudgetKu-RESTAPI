const supabase = require("../middleware/supabaseClient");

const createPengeluaran = async (req, res) => {
  try {
    const { jumlah, keterangan, keperluan } = req.body;
    const email = req.user.email;

    console.log("Creating pengeluaran with data:", {
      jumlah,
      keterangan,
      keperluan,
      email,
    });

    const { data, error } = await supabase
      .from("data_pengeluaran")
      .insert([
        {
          jumlah,
          keterangan,
          keperluan,
          email,
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Error creating pengeluaran:", error.message);
      return res.status(400).json({ message: error.message });
    }

    console.log("Pengeluaran created successfully:", data);
    return res
      .status(201)
      .json({ message: "Pengeluaran created successfully", data });
  } catch (err) {
    console.error("Internal server error:", err.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getPengeluaran = async (req, res) => {
  try {
    const email = req.user.email;
    const { page = 1, limit = 10, keyword } = req.query;

    console.log(
      `Fetching pengeluaran for email: ${email}, page: ${page}, limit: ${limit}, keyword: ${keyword}`
    );

    const offset = (page - 1) * limit;

    let query = supabase
      .from("data_pengeluaran")
      .select("*", { count: "exact" })
      .eq("email", email)
      .range(offset, offset + limit - 1);

    if (keyword) {
      query = query.ilike("keperluan", `%${keyword}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching pengeluaran:", error.message);
      return res.status(400).json({ message: error.message });
    }

    console.log("Fetched pengeluaran data:", data);
    return res.status(200).json({
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || data.length,
      },
    });
  } catch (err) {
    console.error("Internal server error:", err.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const updatePengeluaran = async (req, res) => {
  try {
    const { id } = req.params;
    const { jumlah, keterangan, keperluan } = req.body;
    const email = req.user.email;

    console.log(`Updating pengeluaran with id: ${id}, email: ${email}`);

    const { data, error } = await supabase
      .from("data_pengeluaran")
      .update({
        jumlah,
        keterangan,
        keperluan,
      })
      .match({ id, email })
      .select("*")
      .single();

    if (error) {
      console.error("Error updating pengeluaran:", error.message);
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      console.log("Pengeluaran not found or doesn't belong to the user");
      return res.status(404).json({
        message: "Pengeluaran not found or doesn't belong to the user",
      });
    }

    console.log("Pengeluaran updated successfully:", data);
    return res
      .status(200)
      .json({ message: "Pengeluaran updated successfully", data });
  } catch (err) {
    console.error("Internal server error:", err.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const deletePengeluaran = async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.user.email;

    console.log(`Deleting pengeluaran with id: ${id}, email: ${email}`);

    const { data, error } = await supabase
      .from("data_pengeluaran")
      .delete()
      .match({ id, email })
      .select("*")
      .single();

    if (error) {
      console.error("Error deleting pengeluaran:", error.message);
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      console.log("Pengeluaran not found or doesn't belong to the user");
      return res.status(404).json({
        message: "Pengeluaran not found or doesn't belong to the user",
      });
    }

    console.log("Pengeluaran deleted successfully:", data);
    return res
      .status(200)
      .json({ message: "Pengeluaran deleted successfully", data });
  } catch (err) {
    console.error("Internal server error:", err.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports = {
  createPengeluaran,
  getPengeluaran,
  updatePengeluaran,
  deletePengeluaran,
};
