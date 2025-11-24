import React, { useState } from "react";
import api from "../services/api";

function RaPredictForm() {
  const [form, setForm] = useState({
    power: "",
    speed: "",
    hatch: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const predict = async () => {
    const res = await api.post(
      `/predict-ra?power=${form.power}&speed=${form.speed}&hatch=${form.hatch}`
    );
    setResult(res.data.Predicted_Ra);
  };

  return (
    <div className="p-6 bg-white shadow rounded w-full md:w-1/2 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Predict Experimental Ra</h2>

      <input name="power" onChange={handleChange} placeholder="Laser Power" className="input" />
      <input name="speed" onChange={handleChange} placeholder="Scanning Speed" className="input" />
      <input name="hatch" onChange={handleChange} placeholder="Hatch Spacing" className="input" />

      <button onClick={predict} className="btn-primary mt-3">Predict</button>

      {result && (
        <p className="text-lg mt-4 font-semibold">
          Predicted Ra: {result.toFixed(3)}
        </p>
      )}
    </div>
  );
}

export default RaPredictForm;
