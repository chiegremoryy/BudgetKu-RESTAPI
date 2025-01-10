const supabase = require("../middleware/supabaseClient");

const getSaldoData = async (email) => {
  try {
    // Fetch pemasukan
    const { data: pemasukanData, error: pemasukanError } = await supabase
      .from('data_pemasukan')
      .select('jumlah')
      .eq('email', email);

    if (pemasukanError) {
      throw new Error(`Error fetching pemasukan data: ${pemasukanError.message}`);
    }

    // Fetch pengeluaran
    const { data: pengeluaranData, error: pengeluaranError } = await supabase
      .from('data_pengeluaran')
      .select('jumlah')
      .eq('email', email);

    if (pengeluaranError) {
      throw new Error(`Error fetching pengeluaran data: ${pengeluaranError.message}`);
    }

    // Pastikan data pemasukan dan pengeluaran tidak kosong, dan set default jika kosong
    const totalPemasukan = pemasukanData ? pemasukanData.reduce((acc, item) => acc + item.jumlah, 0) : 0;
    const totalPengeluaran = pengeluaranData ? pengeluaranData.reduce((acc, item) => acc + item.jumlah, 0) : 0;

    console.log("Total Pemasukan:", totalPemasukan);
    console.log("Total Pengeluaran:", totalPengeluaran);

    // Return properti dengan nama yang sesuai dengan format yang dibutuhkan
    return {
      total_pemasukan: totalPemasukan,
      total_pengeluaran: totalPengeluaran,
      total_saldo: totalPemasukan - totalPengeluaran
    };
  } catch (error) {
    console.error("Error in getSaldoData:", error);
    throw new Error("Error fetching saldo data");
  }
};

module.exports = {
  getSaldoData
};
