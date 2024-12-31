const supabase = require("../middleware/supabaseClient");
const moment = require("moment-timezone"); // Import moment-timezone

const getSaldoWeekly = async (req, res) => {
  const email = req.user.email; // Email pengguna dari token JWT
  console.log("Fetching weekly saldo for user with email:", email);

  try {
    // Ambil waktu satu minggu yang lalu dengan zona waktu Asia/Jakarta
    const oneWeekAgo = moment()
      .tz("Asia/Jakarta")
      .subtract(7, "days")
      .toISOString();

    // Hitung total pemasukan dalam seminggu
    const { data: pemasukanData, error: pemasukanError } = await supabase
      .from("data_pemasukan")
      .select("jumlah")
      .eq("email", email)
      .gte("tanggal", oneWeekAgo); // Mengambil data setelah tanggal 7 hari yang lalu

    if (pemasukanError) {
      console.error("Error fetching pemasukan data:", pemasukanError);
      return res
        .status(500)
        .json({
          message: "Error fetching pemasukan data",
          error: pemasukanError,
        });
    }

    console.log("Weekly pemasukan data:", pemasukanData);

    const totalPemasukan = pemasukanData.reduce(
      (acc, item) => acc + item.jumlah,
      0
    );
    console.log("Weekly Total Pemasukan:", totalPemasukan);

    // Hitung total pengeluaran dalam seminggu
    const { data: pengeluaranData, error: pengeluaranError } = await supabase
      .from("data_pengeluaran")
      .select("jumlah")
      .eq("email", email)
      .gte("tanggal", oneWeekAgo); // Mengambil data setelah tanggal 7 hari yang lalu

    if (pengeluaranError) {
      console.error("Error fetching pengeluaran data:", pengeluaranError);
      return res
        .status(500)
        .json({
          message: "Error fetching pengeluaran data",
          error: pengeluaranError,
        });
    }

    console.log("Weekly pengeluaran data:", pengeluaranData);

    const totalPengeluaran = pengeluaranData.reduce(
      (acc, item) => acc + item.jumlah,
      0
    );
    console.log("Weekly Total Pengeluaran:", totalPengeluaran);

    // Hitung saldo mingguan
    const weeklySaldo = totalPemasukan - totalPengeluaran;
    console.log("Weekly Saldo:", weeklySaldo);

    // Tentukan apakah saldo mingguan plus atau minus
    const status = weeklySaldo >= 0 ? "plus" : "minus";

    // Kirim respons
    res.status(200).json({
      status: true,
      message: `Saldo mingguan berhasil dihitung. Status: ${status}`,
      data: {
        total_pemasukan: totalPemasukan,
        total_pengeluaran: totalPengeluaran,
        weekly_saldo: weeklySaldo,
        status, // 'plus' atau 'minus'
      },
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = getSaldoWeekly;
