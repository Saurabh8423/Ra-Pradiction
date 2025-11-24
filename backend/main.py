from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import cv2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# FastAPI setup
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, change to frontend domain
    allow_methods=["*"],
    allow_headers=["*"]
)

# Dataset
data = {
    "Laser Power": [250, 250, 250, 250, 250, 250, 250, 250, 250, 300, 300, 300, 300, 300, 300, 300, 300, 300, 350, 350, 350, 350, 350, 350, 350, 350, 350],
    "Scanning Speed": [700, 700, 700, 800, 800, 800, 900, 900, 900, 700, 700, 700, 800, 800, 800, 900, 900, 900, 700, 700, 700, 800, 800, 800, 900, 900, 900],
    "Hatch Spacing": [0.11, 0.12, 0.13, 0.11, 0.12, 0.13, 0.11, 0.12, 0.13, 0.11, 0.12, 0.13, 0.11, 0.12, 0.13, 0.11, 0.12, 0.13, 0.11, 0.12, 0.13, 0.11, 0.12, 0.13, 0.11, 0.12, 0.13],
    "Experimental Ra": [11.820, 11.834, 11.954, 10.075, 10.405, 10.524, 9.405, 9.587, 9.705, 12.901, 12.236, 12.687, 12.645, 12.806, 12.850, 13.349, 13.492, 13.597, 13.852, 13.865, 13.932, 13.646, 13.684, 13.745, 12.934, 12.965, 12.986]
}
df = pd.DataFrame(data)

# Split data
X = df.drop(columns=["Experimental Ra"])
y = df["Experimental Ra"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Build model
model = Sequential([
    Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
    BatchNormalization(),
    Dropout(0.3),
    Dense(64, activation='relu'),
    BatchNormalization(),
    Dropout(0.2),
    Dense(32, activation='relu'),
    Dense(1)
])
model.compile(optimizer='adam', loss='mse', metrics=['mae'])
model.fit(X_train, y_train, epochs=200, batch_size=5, verbose=0, validation_data=(X_test, y_test))

# API route for prediction
@app.post("/predict")
async def predict_ra(laser_power: float, scanning_speed: float, hatch_spacing: float):
    input_data = np.array([[laser_power, scanning_speed, hatch_spacing]])
    input_scaled = scaler.transform(input_data)
    pred = model.predict(input_scaled)
    return {"predicted_ra": float(pred[0][0])}

# API route for porosity analysis
@app.post("/porosity")
async def porosity_analysis(file: UploadFile = File(...)):
    image = cv2.imdecode(np.frombuffer(await file.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
    _, binary = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    pore_area = sum(cv2.contourArea(cnt) for cnt in contours)
    total_area = image.shape[0] * image.shape[1]
    porosity = (pore_area / total_area) * 100
    return {"total_pores": len(contours), "porosity_percentage": porosity}
