const supabase = require("../middleware/supabaseClient");

const createPengeluaran = async ({ jumlah, keterangan, keperluan, email }) => {
  try {
    const { data, error } = await supabase
      .from("data_pengeluaran")
      .insert([
        {
          jumlah,
          keterangan,
          keperluan,
          email,
        },
      ])
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error creating pengeluaran: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in createPengeluaran:", error);
    throw new Error("Error creating pengeluaran");
  }
};

const getPengeluaran = async ({ email, offset, limit, keyword }) => {
  try {
    let query = supabase
      .from("data_pengeluaran")
      .select("*", { count: "exact" })
      .eq("email", email)
      .range(offset, offset + limit - 1);

    if (keyword) {
      query = query.ilike("keperluan", `%${keyword}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Error fetching pengeluaran: ${error.message}`);
    }

    return { data, count };
  } catch (error) {
    console.error("Error in getPengeluaran:", error);
    throw new Error("Error fetching pengeluaran");
  }
};

const updatePengeluaran = async ({ id, jumlah, keterangan, keperluan, email }) => {
  try {
    const { data, error } = await supabase
      .from("data_pengeluaran")
      .update({
        jumlah,
        keterangan,
        keperluan,
      })
      .match({ id, email })
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error updating pengeluaran: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in updatePengeluaran:", error);
    throw new Error("Error updating pengeluaran");
  }
};

const deletePengeluaran = async ({ id, email }) => {
  try {
    const { data, error } = await supabase
      .from("data_pengeluaran")
      .delete()
      .match({ id, email })
      .select("*")
      .single();

    if (error) {
      throw new Error(`Error deleting pengeluaran: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in deletePengeluaran:", error);
    throw new Error("Error deleting pengeluaran");
  }
};

module.exports = {
  createPengeluaran,
  getPengeluaran,
  updatePengeluaran,
  deletePengeluaran,
};
