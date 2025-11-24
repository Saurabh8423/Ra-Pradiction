import React, { useState } from "react";
import api from "../services/api";

function PorosityUpload() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/porosity", formData);
    setData(res.data);
  };

  return (
    <div className="p-6 bg-white shadow rounded w-full md:w-1/2 mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Porosity Detection</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={upload} className="btn-primary mt-4">Analyze</button>

      {data && (
        <div className="mt-4">
          <p>Pores: {data.total_pores}</p>
          <p>Porosity: {data.porosity_percentage.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default PorosityUpload;
