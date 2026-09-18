from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model/house_price_model.pkl")

class HouseFeatures(BaseModel):
    location: str
    carpet_area: float
    bathroom: float
    balcony: float
    car_parking: str

@app.post("/predict")
def predict(features: HouseFeatures):
    df = pd.DataFrame([{
        "location": features.location,
        "Carpet Area": features.carpet_area,
        "Bathroom": features.bathroom,
        "Balcony": features.balcony,
        "Car Parking": features.car_parking
    }])
    prediction = model.predict(df)[0]
    return {"predicted_price": round(float(prediction), 2)}