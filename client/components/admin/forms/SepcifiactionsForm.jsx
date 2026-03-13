"use client";

import { AccessTime, BrandingWatermark, Factory, Public, RestaurantMenu, Straighten } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";


const SepcifiactionsForm = ({ specifications,setSepciciaction }) => {

    const handleChange = (e) => {
        const update = { ...specifications, [e.target.name]: e.target.value };

        setSepciciaction(update);
    }
    return (
        <div className="row mt-4">
            <div className="col-lg-12 mb-3">
                <h5>Specifiactions</h5>
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Brand Name" name="brandName" size="small" value={specifications?.brandName || ""} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><BrandingWatermark fontSize="small" /></InputAdornment>,
                    },
                }} />
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Ingredients" name="ingredients" size="small" value={specifications?.ingredients || ""} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><RestaurantMenu fontSize="small" /></InputAdornment>,
                    },
                }}/>
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Country Of Origin" name="countryOfOrigin" size="small" value={specifications?.countryOfOrigin || ""} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><Public fontSize="small" /></InputAdornment>,
                    },
                }} />
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Shelf Life" name="shelfLife" size="small" value={specifications?.shelfLife || ""} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><AccessTime fontSize="small" /></InputAdornment>,
                    },
                }} />
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Manufacturer" name="manufacturer" size="small" value={specifications?.manufacturer || ""} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><Factory fontSize="small" /></InputAdornment>,
                    },
                }} />
            </div>

            <div className="col-lg-4 mb-3">
                <TextField fullWidth label="Dimensions" name="dimensions" size="small" value={specifications?.dimensions || ""} onChange={handleChange} slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start"><Straighten fontSize="small" /></InputAdornment>,
                    },
                }} />
            </div>

        </div>
    )
}

export default SepcifiactionsForm