import React from "react";
import RaPredictForm from "./components/RaPredictForm";
import PorosityUpload from "./components/PorosityUpload";
import './styles.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container-card">
        <div className="form-wrapper half">
          <div className="p-6 bg-white shadow rounded card-inner">
            <RaPredictForm />
          </div>

          <div className="p-6 bg-white shadow rounded card-inner" style={{marginTop: '1.5rem'}}>
            <PorosityUpload />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
