import axiosInstance from "@/lib/axiosInstance";

const API_URL = "/Auth";

const userLogin = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post(`${API_URL}/signin/local`, data);
  return response.data;
};

const userLogout = async () => {
  const response = await axiosInstance.post(`${API_URL}/logout`);
  return response;
};

const userSignup = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await axiosInstance.post(`${API_URL}/signup`, data);
  return response.data;
};

const validateUserSession = async () => {
  const response = await axiosInstance.get(`${API_URL}/Validate`);
  return response.data;
};

export { userLogin, userLogout, userSignup, validateUserSession };
