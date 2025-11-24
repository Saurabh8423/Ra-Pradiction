import React, { useState } from 'react';
import axios from 'axios';

const RaPredictForm = () => {
  const [laserPower, setLaserPower] = useState('');
  const [scanningSpeed, setScanningSpeed] = useState('');
  const [hatchSpacing, setHatchSpacing] = useState('');
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://localhost:8000/predict', null, {
        params: { laser_power: laserPower, scanning_speed: scanningSpeed, hatch_spacing: hatchSpacing }
      });
      setResult(response.data.predicted_ra.toFixed(3));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form>
      <h2>Predict Experimental Ra</h2>
      <input placeholder="Laser Power" value={laserPower} onChange={e => setLaserPower(e.target.value)} />
      <input placeholder="Scanning Speed" value={scanningSpeed} onChange={e => setScanningSpeed(e.target.value)} />
      <input placeholder="Hatch Spacing" value={hatchSpacing} onChange={e => setHatchSpacing(e.target.value)} />
      <button type="button" onClick={handlePredict}>Predict</button>
      {result && <p>Predicted Ra: {result}</p>}
    </form>
  );
};

export default RaPredictForm;
