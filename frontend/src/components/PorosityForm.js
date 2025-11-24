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
      const response = await axios.post('https://ra-pradiction.onrender.com/porosity', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert('Error uploading file. Make sure the backend is running.');
    }
  };

  return (
    <form>
      <h2>Porosity Analysis</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <div className="button-group">
        <button type="button" onClick={handleUpload}>Analyze</button>
        <button type="button" onClick={() => { setFile(null); setResult(null); }} className="clear-button">Clear</button>
      </div>
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
