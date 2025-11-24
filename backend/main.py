from fastapi import FastAPI, UploadFile, File
import uvicorn
import numpy as np
import cv2
from tensorflow.keras.models import load_model
from porosity import detect_porosity

app = FastAPI()

model = load_model("saved_model")
scaler_mean = np.load("scaler.npy")
scaler_scale = np.load("scaler_scale.npy")

@app.post("/predict-ra")
async def predict_ra(power: float, speed: float, hatch: float):
    x = np.array([[power, speed, hatch]])
    x_scaled = (x - scaler_mean) / scaler_scale
    prediction = model.predict(x_scaled)
    return {"Predicted_Ra": float(prediction)}

@app.post("/porosity")
async def porosity(file: UploadFile = File(...)):
    contents = await file.read()
    temp_path = "temp.jpg"
    with open(temp_path, "wb") as f:
        f.write(contents)

    porosity_percentage, pores = detect_porosity(temp_path)
    return {"porosity_percentage": porosity_percentage, "total_pores": pores}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
