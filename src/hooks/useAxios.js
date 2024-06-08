import axios from "axios";
const axiosCommon = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // withCredentials: true,
});
export function useAxios() {
  return axiosCommon;
}
