"use client";

import { Add, CurrencyRupee, Delete, Inventory, Label } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const WeightsOption = ({ productName, weightOptions, setWeightOptions }) => {
    const [options, setOptions] = useState(weightOptions);

    const generateSKU = (productName, label) => {

        if (!productName || !label) return "";

        const namePart = productName.replace(/\s+/g, "").substring(0, 6).toUpperCase();

        const labelPart = label.replace(/\s+/g, "").toUpperCase();

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randomLetters = "";

        for (let i = 0; i < 3; i++) {
            randomLetters += letters[Math.floor(Math.random() * letters.length)];
        }

        const numbers = Math.floor(10 + Math.random() * 90);

        return `${namePart}-${labelPart}-${randomLetters}${numbers}`;

    }
    const addOptions = () => {
        const newOptions = [...options, { label: "", price: "", mrp: "", stock: "", sku: "" }];
        setOptions(newOptions);
        setWeightOptions(newOptions);
    };

    const removeOptions = (index) => {
        const updated = [...options];
        updated.splice(index, 1);
        setOptions(updated);
        setWeightOptions(updated);
    };

    const handleChange = (index, field, value) => {
        const updated = [...options];
        updated[index][field] = value;
        if (field === "label") {
            updated[index].sku = generateSKU(productName, value);
        }
        setOptions(updated);
        setWeightOptions(updated);
    };

    return (
        <div className="row mt-4">
            <div className="col-lg-12">
                <h5>Weights Options</h5>
            </div>

            {
                options.map((opt, index) => (
                    <div key={index} className="col-lg-12 mb-3">
                        <div className="row align-items-center">

                            <div className="col-lg-2 col-md-6">
                                <TextField label="Label" fullWidth size="small" value={opt.label} onChange={(e) => handleChange(index, 'label', e.target.value)} slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start"><Label fontSize="small" /></InputAdornment>,
                                    },
                                }} />
                            </div>

                            <div className="col-lg-2 col-md-6">
                                <TextField slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start"><CurrencyRupee fontSize="small" /></InputAdornment>,
                                    },
                                }} label="Price" type="number" fullWidth size="small" value={opt.price} onChange={(e) => handleChange(index, 'price', e.target.value)} />
                            </div>

                            <div className="col-lg-2 col-md-6">
                                <TextField label="MRP" type="number" fullWidth size="small" value={opt.mrp} onChange={(e) => handleChange(index, 'mrp', e.target.value)} slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start"><CurrencyRupee fontSize="small" /></InputAdornment>,
                                    },
                                }} />
                            </div>

                            <div className="col-lg-2 col-md-6">
                                <TextField label="Stock" type="number" fullWidth size="small" value={opt.stock} onChange={(e) => handleChange(index, 'stock', e.target.value)} slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start"><Inventory fontSize="small" /></InputAdornment>,
                                    },
                                }} />
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <TextField label="SKU" fullWidth size="small" value={opt.sku} onChange={(e) => handleChange(index, 'sku', e.target.value)} />
                            </div>

                            <div className="col-lg-1">
                                <IconButton color="error" onClick={() => removeOptions(index)}>
                                    <Delete />
                                </IconButton>
                            </div>


                        </div>
                    </div>
                ))
            }
            <div className="col-lg-12">
                <Button variant="contained" startIcon={<Add />} onClick={addOptions}  >
                    Add Weight Options
                </Button>
            </div>
        </div>
    )
}

export default WeightsOption