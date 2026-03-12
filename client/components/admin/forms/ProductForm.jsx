"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import formStyles from "./forms.module.css"
import { Button, FormControl, Input, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import ImageUploader from "./ImageUploader";
import WeightsOption from "./WeightsOption";
import SepcifiactionsForm from "./SepcifiactionsForm";
import NutritentsInfo from "./NutritentsInfo";
import SeoForm from "./SeoForm";

const ProductForm = () => {
    const [categories, setCategories] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [galleryImage, setGalleryImage] = useState([]);
    const [weightOptions, setWeightOptions] = useState([]);
    const [specifications, setSpecifications] = useState({});
    const [nutrition, setNutrition] = useState({});
    const [seo, setSeo] = useState({});

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
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/category");
            setCategories(res.data);
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchCategories();
    }, [])
    const submitHandler = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("pname", form.pname);
            formData.append("description", form.description);
            formData.append("category", form.category);
            formData.append("isFeatured", form.isFeatured);
            formData.append("isActive", form.isActive);
            if (mainImage) { formData.append("mainImage", mainImage); }

            galleryImage.forEach((img) => {
                formData.append("images", img);
            });

            formData.append("weightOptions", JSON.stringify(weightOptions));
            formData.append("specifications", JSON.stringify(specifications));
            formData.append("nutritionInfo", JSON.stringify(nutrition));
            formData.append("seo", JSON.stringify(seo));

            await axios.post("http://localhost:5000/api/products", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                }
            );

            alert("Product Created Successfully");
            setForm({
                pname: "",
                description: "",
                category: "",
                isFeatured: false,
                isActive: true
            });

        } catch (err) {
            console.log(err);
        }

        setMainImage(null);
        setGalleryImage([]);
        setWeightOptions([]);
        setSpecifications({});
        setNutrition({});
        setSeo({});
    }
    return (
        <form onSubmit={submitHandler} className={`${formStyles.adminCard} p-4`}>
            <h5 className="mb-3">Basic Informations</h5>

            <div className="row">

                <div className="col-lg-6">
                    <TextField fullWidth label="Product Name" name="pname" className="mb-3" onChange={handleChange} />
                </div>

                <div className="col-lg-6">
                    <FormControl fullWidth size="medium">
                        <InputLabel>Category</InputLabel>
                        <Select name="category" value={form.category} label="Category" onChange={handleChange}>
                            {categories.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.cname}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="col-lg-12">
                    <TextField fullWidth label="Description" name="description" multiline rows={4} className="mb-3" onChange={handleChange} />
                </div>

                <div className="col-lg-6 d-flex">
                    <div>
                        Featured
                        <Switch onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                    </div>

                    <div>
                        Active
                        <Switch checked onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                    </div>
                </div>

            </div>

            <ImageUploader setMainImage={setMainImage} setGalleryImage={setGalleryImage} />

            <WeightsOption setWeightOptions={setWeightOptions} />

            <SepcifiactionsForm setSepciciaction={setSpecifications} />

            <NutritentsInfo setNutrition={setNutrition} />

            <SeoForm setSeo={setSeo} />

            <div className="d-flex justify-content-center">
                <Button type="submit" variant="contained">
                    Create Product
                </Button>
            </div>

        </form>
    )
}

export default ProductForm