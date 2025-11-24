import React from 'react';
import RaPredictForm from './components/RaPredictForm';
import PorosityForm from './components/PorosityForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Experimental Ra & Porosity Analysis</h1>
      <RaPredictForm />
      <PorosityForm />
    </div>
  );
}

export default App;
