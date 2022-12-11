import axios from "axios";

const API = "http://localhost:3001";

const getEmployees = () => {
  return axios.get(`${API}/employees/all`);
};

const getEmployeeByName = (name) => {
  return axios.get(`${API}/employees/search/${name}`);
};

export { getEmployees, getEmployeeByName };
