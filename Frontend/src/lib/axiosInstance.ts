import axios from "axios";
import Swal from "sweetalert2";
import type { AxiosError } from "axios";
import { userLogout } from "@/api/AuthApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

console.log(backendUrl);

const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

let isAlreadyHandlingUnauthorized = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const isUnauthorized = error.response?.status === 401;
    const isReportRoute = window.location.pathname.includes("Report");
    const isLogoutRoute = error.request?.__URL__.includes("logout");

    if (
      isUnauthorized &&
      isReportRoute &&
      !isAlreadyHandlingUnauthorized &&
      !isLogoutRoute
    ) {
      isAlreadyHandlingUnauthorized = true;

      await Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Your session has expired. Please login again.",
        confirmButtonText: "OK",
        backdrop: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await userLogout();
            window.location.href = "/Login";
          } catch (logoutErr) {
            console.error("Logout failed:", logoutErr);
          }
          setTimeout(() => {
            isAlreadyHandlingUnauthorized = false;
          }, 100);
        }
      });

      setTimeout(() => {
        isAlreadyHandlingUnauthorized = false;
      }, 100);
    }

    return Promise.reject(error.response?.data ?? error);
  }
);

export default axiosInstance;
