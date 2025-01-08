const supabase = require("../middleware/supabaseClient");

const createPemasukan = async (req, res) => {
  try {
    const { jumlah, keterangan, sumber_dana } = req.body;
    const email = req.user.email;

    console.log("Creating pemasukan with data:", {
      jumlah,
      keterangan,
      sumber_dana,
      email,
    });

    const { data, error } = await supabase
      .from("data_pemasukan")
      .insert([
        {
          jumlah,
          keterangan,
          sumber_dana,
          email,
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Error creating pemasukan:", error.message);
      return res.status(400).json({ message: error.message });
    }

    console.log("Pemasukan created successfully:", data);
    return res
      .status(201)
      .json({ message: "Pemasukan created successfully", data });
  } catch (err) {
    console.error("Internal server error:", err.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getPemasukan = async (req, res) => {
  try {
    const email = req.user.email;
    const { page = 1, limit = 10, keyword } = req.query;

    console.log(
      `Fetching pemasukan for email: ${email}, page: ${page}, limit: ${limit}, keyword: ${keyword}`
    );

    const offset = (page - 1) * limit;
    let query = supabase
      .from("data_pemasukan")
      .select("*", { count: "exact" })
      .eq("email", email)
      .range(offset, offset + limit - 1);

    if (keyword) {
      query = query.ilike("sumber_dana", `%${keyword}%`);
    }
    const { data, error, count } = await query;
    
    if (error) {
      console.error("Error fetching pemasukan:", error.message);
      return res.status(400).json({ message: error.message });
    }

    console.log("Fetched pemasukan data:", data);
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

const updatePemasukan = async (req, res) => {
  try {
    const { id } = req.params;
    const { jumlah, keterangan, sumber_dana } = req.body;
    const email = req.user.email;

    console.log(`Updating pemasukan with id: ${id}, email: ${email}`);

    const { data, error } = await supabase
      .from("data_pemasukan")
      .update({
        jumlah,
        keterangan,
        sumber_dana,
      })
      .match({ id, email })
      .select("*")
      .single();

    if (error) {
      console.error("Error updating pemasukan:", error.message);
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      console.log("Pemasukan not found or doesn't belong to the user");
      return res
        .status(404)
        .json({ message: "Pemasukan not found or doesn't belong to the user" });
    }

    console.log("Pemasukan updated successfully:", data);
    return res
      .status(200)
      .json({ message: "Pemasukan updated successfully", data });
  } catch (err) {
    console.error("Internal server error:", err.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const deletePemasukan = async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.user.email;

    console.log(`Deleting pemasukan with id: ${id}, email: ${email}`);

    const { data, error } = await supabase
      .from("data_pemasukan")
      .delete()
      .match({ id, email })
      .select("*")
      .single();

    if (error) {
      console.error("Error deleting pemasukan:", error.message);
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      console.log("Pemasukan not found or doesn't belong to the user");
      return res
        .status(404)
        .json({ message: "Pemasukan not found or doesn't belong to the user" });
    }

    console.log("Pemasukan deleted successfully:", data);
    return res
      .status(200)
      .json({ message: "Pemasukan deleted successfully", data });
  } catch (err) {
    console.error("Internal server error:", err.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports = {
  createPemasukan,
  getPemasukan,
  updatePemasukan,
  deletePemasukan,
};
