"use client";
import axios from "axios";
import { useState } from "react";
import formStyles from "./forms.module.css"
import { TextField } from "@mui/material";
import ImageUploader from "./ImageUploader";
import WeightsOption from "./WeightsOption";

const ProductForm = () => {
    const [mainImage, setMainImage] = useState(null);
    const [galleryImage, setGalleryImage] = useState([]);
    const [weightOptions,setWeightOptions] = useState([]);

    const [form, setForm] = useState({
        pname: "",
        description: "",
        category: "",
        isFeatured: false,
        isActive: true,
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/products", form, { withCredentials: true });
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <form onSubmit={submitHandler} className={`${formStyles.adminCard} p-4`}>
            <h5 className="mb-3">Basic Informations</h5>

            <div className="row">
                <div className="col-lg-6">
                    <TextField fullWidth label="Product Name" name="pname" className="mb-3" onChange={handleChange} />
                </div>
                <div className="col-lg-6">
                    <TextField label="Category ID" name="category" fullWidth className="mb-3" onChange={handleChange} />
                </div>
                <div className="col-lg-12">
                    <TextField fullWidth label="Description" name="description" multiline rows={4} className="mb-3" onChange={handleChange} />
                </div>


            </div>

            <ImageUploader setMainImage={setMainImage} setGalleryImage={setGalleryImage} />

            <WeightsOption setWeightOptions={setWeightOptions} />

        </form>
    )
}

export default ProductForm