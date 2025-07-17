import axios from "axios";

export const Document = {
  getAllUserDocument: async (email: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/docs/email/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("userData") || '{}')?.token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error
    }
  },
  getAllVersionOfDocument:async(name:string | undefined)=>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/docs/${name}/versions`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("userData") || '{}')?.token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error
    }
  },
  getDocumentContent: async (name: string|undefined, version: number|undefined) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/docs/${name}/v/${version}`,
        {
          responseType: 'blob', // Important: Handle binary data
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("userData") || '{}')?.token}`
          }
        }
      );
      
      // Get content type from response headers
      const contentType = response.headers['content-type'] || 'application/octet-stream';
      
      // Create blob URL for the file
      const blob = new Blob([response.data], { type: contentType });
      const fileUrl = URL.createObjectURL(blob);
      
      // For text files, read as text
      if (contentType.includes('text/') || contentType.includes('application/json')) {
        const text = await blob.text();
        return {
          content: text,
          contentType: contentType,
          fileUrl: fileUrl,
          blob: blob
        };
      }
      
      // For other files (PDF, images, etc.), return the blob URL
      return {
        content: fileUrl,
        contentType: contentType,
        fileUrl: fileUrl,
        blob: blob
      };
    } catch (error) {
      throw error
    }
  },
};
