import axiosInstance from "@/lib/axiosInstance";

const API_URL = "/Reports";
const generateReport = async ({ sessionId }: { sessionId: string }) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/generate-report`, {
      sessionId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const listReports = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const downloadReport = async (reportId: string) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/download/${reportId}`,
      {
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const generateDynamicReport = async (data: object) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/generate-dynamic-report`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { generateReport, listReports, downloadReport, generateDynamicReport };
