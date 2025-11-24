import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def train_model():

    data = {
        "Laser Power": [...],
        "Scanning Speed": [...],
        "Hatch Spacing": [...],
        "Experimental Ra": [...]
    }

    df = pd.DataFrame(data)

    X = df.drop(columns=["Experimental Ra"])
    y = df["Experimental Ra"]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    model = Sequential([
        Dense(128, activation='relu', input_shape=(3,)),
        BatchNormalization(),
        Dropout(0.3),
        Dense(64, activation='relu'),
        BatchNormalization(),
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dense(1)
    ])

    model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    model.fit(X_scaled, y, epochs=200, batch_size=5, verbose=0)

    model.save("saved_model")
    np.save("scaler.npy", scaler.mean_)
    np.save("scaler_scale.npy", scaler.scale_)

    return "Training Completed"
