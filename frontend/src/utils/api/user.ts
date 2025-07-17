import axios from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface userData{
  email:string;
  token:string|null;
}

interface LoginFormData {
  email: string;
  password: string;
}

export const UserApi = {
  createUser: async (formData: FormData | undefined) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/create`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  loginUser: async (formData: LoginFormData | undefined) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logoutUser: async () => {
    try {
      const storedUserData = localStorage.getItem("userData");
      const userData: userData | null = storedUserData ? JSON.parse(storedUserData) : null;
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/user/logout`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
          params: {
            email: userData?.email,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
