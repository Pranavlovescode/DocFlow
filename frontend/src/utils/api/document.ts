import axios from "axios";

export const Document = {
  getAllUserDocument: async (email: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/docs/email/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error
    }
  },
};
