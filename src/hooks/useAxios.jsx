import axios from "axios";

const axe = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxios = () => {
  return axe;
};

export default useAxios;
