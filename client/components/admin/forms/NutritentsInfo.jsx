"use client";

import { TextField } from '@mui/material';
import React, { useState } from 'react'

const NutritentsInfo = ({setNutrition}) => {
    const [nutrition, setNutritionState] = useState({
        energy: "",
        protein: "",
        carbohydrates: "",
        sugar: "",
        totalFat: "",
        saturatedFat: "",
        monoUnsaturatedFat: "",
        polyUnsaturatedFat: "",
        transFat: "",
        cholesterol: "",
        sodium: ""
    });
    const handleChange = (e) => {
        const update = { ...nutrition, [e.target.name]: e.target.value }
        setNutritionState(update);
        setNutrition(update);
    }
    return (
        <div className="row mt-4">

            <div className="col-12 mb-3">
                <h5>Nutrition Information</h5>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
                <TextField label="Energy (kcal)" name="energy" type="number" fullWidth size="small" value={nutrition.energy} onChange={handleChange} />
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
                <TextField label="Protein (g)" name="protein" type="number" fullWidth size="small" value={nutrition.protein} onChange={handleChange} />
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
                <TextField label="Carbohydrates (g)" name="carbohydrates" type="number" fullWidth size="small"
                value={nutrition.carbohydrates} onChange={handleChange}/>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
                <TextField label="Sugar (g)" name="sugar" type="number" fullWidth size="small" value={nutrition.sugar} onChange={handleChange}/>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
                <TextField label="Total Fat (g)" name="totalFat" type="number" fullWidth size="small" value={nutrition.totalFat} onChange={handleChange}/>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
                <TextField label="Saturated Fat (g)" name="saturatedFat" type="number" fullWidth size="small" value={nutrition.saturatedFat} onChange={handleChange}/>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
                <TextField label="Mono Unsaturated Fat" name="monoUnsaturatedFat" type="number" fullWidth size="small" value={nutrition.monoUnsaturatedFat} onChange={handleChange}/>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
                <TextField label="Poly Unsaturated Fat" name="polyUnsaturatedFat" type="number" fullWidth size="small" value={nutrition.polyUnsaturatedFat} onChange={handleChange}/>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
                <TextField label="Trans Fat" name="transFat" type="number" fullWidth size="small" value={nutrition.transFat} onChange={handleChange}/>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">

                <TextField
                    label="Cholesterol"
                    name="cholesterol"
                    type="number"
                    fullWidth
                    size="small"
                    value={nutrition.cholesterol}
                    onChange={handleChange}
                />

            </div>

            <div className="col-lg-4 col-md-6 mb-3">

                <TextField
                    label="Sodium"
                    name="sodium"
                    type="number"
                    fullWidth
                    size="small"
                    value={nutrition.sodium}
                    onChange={handleChange}
                />

            </div>

        </div>
    )
}

export default NutritentsInfo