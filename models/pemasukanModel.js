const supabase = require("../middleware/supabaseClient");

const createPemasukan = async ({ jumlah, keterangan, sumber_dana, email }) => {
  try {
    const { data, error } = await supabase
      .from("data_pemasukan")
      .insert([{ jumlah, keterangan, sumber_dana, email }])
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error creating pemasukan: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in createPemasukan:", error);
    throw new Error("Error creating pemasukan");
  }
};

const getPemasukan = async ({ email, offset, limit, keyword }) => {
  try {
    let query = supabase
      .from('data_pemasukan')
      .select('*')
      .eq('email', email)
      .range(offset, offset + limit - 1);

    if (keyword) {
      query = query.ilike('keterangan', `%${keyword}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Error fetching pemasukan: ${error.message}`);
    }

    return { data, count };
  } catch (error) {
    console.error("Error in getPemasukan:", error);
    throw new Error("Error fetching pemasukan");
  }
};

const updatePemasukan = async ({ id, jumlah, keterangan, sumber_dana, email }) => {
  try {
    const { data, error } = await supabase
      .from("data_pemasukan")
      .update({ jumlah, keterangan, sumber_dana })
      .match({ id, email })
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error updating pemasukan: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in updatePemasukan:", error);
    throw new Error("Error updating pemasukan");
  }
};

const deletePemasukan = async ({ id, email }) => {
  try {
    const { data, error } = await supabase
      .from("data_pemasukan")
      .delete()
      .match({ id, email })
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error deleting pemasukan: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in deletePemasukan:", error);
    throw new Error("Error deleting pemasukan");
  }
};

module.exports = {
  createPemasukan,
  getPemasukan,
  updatePemasukan,
  deletePemasukan,
};
