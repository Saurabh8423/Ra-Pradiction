import React, { useState } from 'react';
import axios from 'axios';

const PorosityForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/porosity', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form>
      <h2>Porosity Analysis</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="button" onClick={handleUpload}>Analyze</button>
      {result && (
        <div>
          <p>Total Pores: {result.total_pores}</p>
          <p>Porosity Percentage: {result.porosity_percentage.toFixed(2)}%</p>
        </div>
      )}
    </form>
  );
};

export default PorosityForm;
