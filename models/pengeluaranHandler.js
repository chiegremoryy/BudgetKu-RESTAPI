const pengeluaranModel = require("./pengeluaranModel");

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

    const data = await pengeluaranModel.createPengeluaran({
      jumlah,
      keterangan,
      keperluan,
      email,
    });

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

    const { data, count } = await pengeluaranModel.getPengeluaran({
      email,
      offset,
      limit: parseInt(limit),
      keyword,
    });

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

    const data = await pengeluaranModel.updatePengeluaran({
      id,
      jumlah,
      keterangan,
      keperluan,
      email,
    });

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

    const data = await pengeluaranModel.deletePengeluaran({
      id,
      email,
    });

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
