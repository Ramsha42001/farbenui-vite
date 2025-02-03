import network from '../../../services/network';

export const loginApi = async (credentials) => {
  try {
    const response = await network.post('/login', credentials); // Use network.post for POST
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error; // Re-throw to be handled by the caller
  }
};
export const signupApi = async (userData) => {
  try {
    const response = await network.post('/signup', userData);
    return response.data;
  } catch (error) {
    console.error("Signup API Error:", error);
    throw error;
  }
};
