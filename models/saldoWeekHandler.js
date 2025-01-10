// saldoWeekHandler.js
const saldoWeekModel = require("./saldoWeekModel");

const getSaldoWeekly = async (req, res) => {
  const email = req.user.email; // Email pengguna dari token JWT
  console.log("Fetching weekly saldo for user with email:", email);

  try {
    // Ambil data saldo mingguan dari model
    const { total_pemasukan, total_pengeluaran, weekly_saldo, status } = await saldoWeekModel.getSaldoWeeklyData(email);

    console.log("Weekly Total Pemasukan:", total_pemasukan);
    console.log("Weekly Total Pengeluaran:", total_pengeluaran);
    console.log("Weekly Saldo:", weekly_saldo);
    console.log("Weekly Saldo Status:", status);

    // Kirim respons dengan data yang sesuai
    return res.status(200).json({
      status: true,
      message: `Saldo mingguan berhasil dihitung. Status: ${status}`,
      data: {
        total_pemasukan,
        total_pengeluaran,
        weekly_saldo,
        status,
      },
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = getSaldoWeekly;
