const pemasukanModel = require("./pemasukanModel");

const createPemasukan = async (req, res) => {
  try {
    const { jumlah, keterangan, sumber_dana } = req.body;
    const email = req.user.email;

    const data = await pemasukanModel.createPemasukan({
      jumlah,
      keterangan,
      sumber_dana,
      email,
    });

    return res
      .status(201)
      .json({ message: "Pemasukan created successfully", data });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getPemasukan = async (req, res) => {
  try {
    const email = req.user.email;
    const { page = 1, limit = 10, keyword } = req.query;

    const offset = (page - 1) * limit;

    const { data, count } = await pemasukanModel.getPemasukan({
      email,
      offset,
      limit: parseInt(limit),
      keyword,
    });

    return res.status(200).json({
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || data.length,
      },
    });
  } catch (err) {
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

    const data = await pemasukanModel.updatePemasukan({
      id,
      jumlah,
      keterangan,
      sumber_dana,
      email,
    });

    if (!data) {
      return res
        .status(404)
        .json({ message: "Pemasukan not found or doesn't belong to the user" });
    }

    return res
      .status(200)
      .json({ message: "Pemasukan updated successfully", data });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const deletePemasukan = async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.user.email;

    const data = await pemasukanModel.deletePemasukan({ id, email });

    if (!data) {
      return res
        .status(404)
        .json({ message: "Pemasukan not found or doesn't belong to the user" });
    }

    return res
      .status(200)
      .json({ message: "Pemasukan deleted successfully", data });
  } catch (err) {
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
