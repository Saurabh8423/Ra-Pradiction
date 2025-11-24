import axios from "axios";

const API_URL = "http://localhost:8000";

export const predictRa = (data) => {
  const formData = new FormData();
  formData.append("laser_power", data.laser_power);
  formData.append("scanning_speed", data.scanning_speed);
  formData.append("hatch_spacing", data.hatch_spacing);
  return axios.post(`${API_URL}/predict-ra`, formData);
};

export const uploadPorosity = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}/porosity`, formData);
};
