const supabase = require('../middleware/supabaseClient');

const createUser = async ({ nama, email, hashedPassword }) => {
  try {
    const { data, error } = await supabase
      .from('user_data')
      .insert([{ nama, email, password: hashedPassword }])
      .select('id, nama, email')
      .single();
    if (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
    return data;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error("Error creating user");
  }
};

const getUserByEmail = async (email) => {
  try {
    const { data, error, status } = await supabase
      .from('user_data')
      .select('id, nama, email, password')
      .eq('email', email);
    if (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
    if (data.length === 0) {
      return null;
    }
    if (data.length > 1) {
      throw new Error('Multiple users found with the same email, which should not happen.');
    }
    return data[0];
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw new Error("Error fetching user by email");
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
