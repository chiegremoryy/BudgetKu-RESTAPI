const saldoModel = require("./saldoModel");

const getSaldo = async (req, res) => {
  const email = req.user.email; // Email pengguna dari token JWT
  console.log('Fetching saldo for user with email:', email);

  try {
    const { total_pemasukan, total_pengeluaran, total_saldo } = await saldoModel.getSaldoData(email);

    console.log('Total Pemasukan:', total_pemasukan);
    console.log('Total Pengeluaran:', total_pengeluaran);
    console.log('Total Saldo:', total_saldo);

    // Kirim respons dengan properti yang sesuai dengan yang dibutuhkan di test
    return res.status(200).json({
      status: true,
      message: 'Total saldo berhasil dihitung',
      data: {
        total_pemasukan,  // Perbaiki agar sesuai dengan data yang benar
        total_pengeluaran,  // Perbaiki agar sesuai dengan data yang benar
        total_saldo,  // Perbaiki agar sesuai dengan data yang benar
      },
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = getSaldo;
