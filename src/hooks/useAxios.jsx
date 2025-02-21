import axios from "axios";

const axe = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

const useAxios = () => {
  return axe;
};

export default useAxios;
