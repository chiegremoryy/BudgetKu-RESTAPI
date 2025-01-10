// saldoWeekModel.js
const supabase = require("../middleware/supabaseClient");

const getSaldoWeeklyData = async (email) => {
  try {
    // Ambil waktu satu minggu yang lalu dengan zona waktu Asia/Jakarta
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // Ambil pemasukan dalam satu minggu terakhir
    const { data: pemasukanData, error: pemasukanError } = await supabase
      .from("data_pemasukan")
      .select("jumlah")
      .eq("email", email)
      .gte("tanggal", oneWeekAgo.toISOString()); // Data mulai 7 hari lalu

    if (pemasukanError) {
      throw new Error(`Error fetching pemasukan data: ${pemasukanError.message}`);
    }

    // Hitung total pemasukan
    const totalPemasukan = pemasukanData ? pemasukanData.reduce((acc, item) => acc + item.jumlah, 0) : 0;

    // Ambil pengeluaran dalam satu minggu terakhir
    const { data: pengeluaranData, error: pengeluaranError } = await supabase
      .from("data_pengeluaran")
      .select("jumlah")
      .eq("email", email)
      .gte("tanggal", oneWeekAgo.toISOString()); // Data mulai 7 hari lalu

    if (pengeluaranError) {
      throw new Error(`Error fetching pengeluaran data: ${pengeluaranError.message}`);
    }

    // Hitung total pengeluaran
    const totalPengeluaran = pengeluaranData ? pengeluaranData.reduce((acc, item) => acc + item.jumlah, 0) : 0;

    // Hitung saldo mingguan
    const weeklySaldo = totalPemasukan - totalPengeluaran;

    return {
      total_pemasukan: totalPemasukan,
      total_pengeluaran: totalPengeluaran,
      weekly_saldo: weeklySaldo,
      status: weeklySaldo >= 0 ? "plus" : "minus", // status saldo
    };
  } catch (error) {
    console.error("Error in getSaldoWeeklyData:", error);
    throw new Error("Error fetching saldo weekly data");
  }
};

module.exports = {
  getSaldoWeeklyData,
};
