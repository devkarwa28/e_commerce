"use client";

import { AccessTime, BrandingWatermark, Factory, Public, RestaurantMenu, Straighten } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";


const SepcifiactionsForm = ({ setSepciciaction }) => {
    const [specs, setSpecs] = useState({
        brandName: "",
        ingredients: "",
        countryOfOrigin: "",
        shelfLife: "",
        manufacturer: "",
        dimensions: ""
    });

    const handleChange = (e) => {
        const update = { ...specs, [e.target.name]: e.target.value };

        setSpecs(update);
        setSepciciaction(update);
    }
    return (
        <div className="row mt-4">
            <div className="col-lg-12 mb-3">
                <h5>Specifiactions</h5>
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Brand Name" name="brandName" size="small" value={specs.brandName} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><BrandingWatermark fontSize="small" /></InputAdornment>,
                    },
                }} />
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Ingredients" name="ingredients" size="small" value={specs.ingredients} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><RestaurantMenu fontSize="small" /></InputAdornment>,
                    },
                }}/>
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Country Of Origin" name="countryOfOrigin" size="small" value={specs.countryOfOrigin} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><Public fontSize="small" /></InputAdornment>,
                    },
                }} />
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Shelf Life" name="shelfLife" size="small" value={specs.shelfLife} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><AccessTime fontSize="small" /></InputAdornment>,
                    },
                }} />
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Manufacturer" name="manufacturer" size="small" value={specs.manufacturer} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><Factory fontSize="small" /></InputAdornment>,
                    },
                }} />
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Dimensions" name="dimensions" size="small" value={specs.dimensions} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><Straighten fontSize="small" /></InputAdornment>,
                    },
                }} />
            </div>

        </div>
    )
}

export default SepcifiactionsForm