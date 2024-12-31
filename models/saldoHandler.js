const supabase = require('../middleware/supabaseClient');

const getSaldo = async (req, res) => {
  const email = req.user.email; // Email pengguna dari token JWT
  console.log('Fetching saldo for user with email:', email);

  try {
    // Hitung total pemasukan
    const { data: pemasukanData, error: pemasukanError } = await supabase
      .from('data_pemasukan')
      .select('jumlah')
      .eq('email', email);

    if (pemasukanError) {
      console.error('Error fetching pemasukan data:', pemasukanError);
      return res.status(500).json({ message: 'Error fetching pemasukan data', error: pemasukanError });
    }

    console.log('Pemasukan data:', pemasukanData);

    const totalPemasukan = pemasukanData.reduce((acc, item) => acc + item.jumlah, 0);
    console.log('Total Pemasukan:', totalPemasukan);

    // Hitung total pengeluaran
    const { data: pengeluaranData, error: pengeluaranError } = await supabase
      .from('data_pengeluaran')
      .select('jumlah')
      .eq('email', email);

    if (pengeluaranError) {
      console.error('Error fetching pengeluaran data:', pengeluaranError);
      return res.status(500).json({ message: 'Error fetching pengeluaran data', error: pengeluaranError });
    }

    console.log('Pengeluaran data:', pengeluaranData);

    const totalPengeluaran = pengeluaranData.reduce((acc, item) => acc + item.jumlah, 0);
    console.log('Total Pengeluaran:', totalPengeluaran);

    // Hitung total saldo
    const totalSaldo = totalPemasukan - totalPengeluaran;
    console.log('Total Saldo:', totalSaldo);

    // Kirim respons
    res.status(200).json({
      status: true,
      message: 'Total saldo berhasil dihitung',
      data: {
        total_pemasukan: totalPemasukan,
        total_pengeluaran: totalPengeluaran,
        total_saldo: totalSaldo,
      },
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = getSaldo;
