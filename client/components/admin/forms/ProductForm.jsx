"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import formStyles from "./forms.module.css"
import { Button, FormControl, Input, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, Switch, TextField } from "@mui/material";
import ImageUploader from "./ImageUploader";
import WeightsOption from "./WeightsOption";
import SepcifiactionsForm from "./SepcifiactionsForm";
import NutritentsInfo from "./NutritentsInfo";
import SeoForm from "./SeoForm";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const steps = ["Basic Info", "Images", "Weight Options", "Specifications", "Nutrition", "SEO", "Review"];

const ProductForm = ({ editData }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [galleryImage, setGalleryImage] = useState([]);
    const [weightOptions, setWeightOptions] = useState([]);
    const [specifications, setSpecifications] = useState({});
    const [nutrition, setNutrition] = useState({});
    const [seo, setSeo] = useState({});
    const router = useRouter();



    const [form, setForm] = useState({
        pname: "",
        description: "",
        category: "",
        isFeatured: false,
        isActive: true,
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        setErrors({ ...errors, [e.target.name]: "" });
    }
    const validateStep1 = () => {
        const newErrors = {};

        if (!form.pname.trim()) {
            newErrors.pname = "Product name required";
        }

        if (!form.description.trim()) {
            newErrors.description = "Description required";
        }

        if (!form.category) {
            newErrors.category = "Select category";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


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
    }, []);
    useEffect(() => {

        if (editData) {

            setForm({
                pname: editData.pname,
                description: editData.description,
                category: editData.category?._id || editData.category,
                isFeatured: editData.isFeatured,
                isActive: editData.isActive
            });

            setWeightOptions(editData.weightOptions || []);
            setSpecifications(editData.specifications || {});
            setNutrition(editData.nutritionInfo || {});
            setSeo(editData.seo || {});

        }

    }, [editData]);

    const nextStep = () => {

        if (activeStep === 0) {
            if (!validateStep1()) return;
        }

        setActiveStep(prev => prev + 1);
    };

    const prevStep = () => {
        setActiveStep(prev => prev - 1);
    };

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

            if (editData) {
                await axios.put(
                    `http://localhost:5000/api/products/${editData._id}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        withCredentials: true
                    }
                );
                alert("Product Edited Successfully");
            }
            else {
                await axios.post("http://localhost:5000/api/products", formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        withCredentials: true
                    }
                );
                alert("Product Created Successfully");
            }

            
            router.push("/admin/products")
        } catch (err) {
            console.log(err);
        }
    }
    const renderStep = () => {
        switch (activeStep) {
            case 0: return (
                <div className="row">

                    <div className="col-lg-6">
                        <TextField fullWidth label="Product Name" name="pname" className="mb-3" onChange={handleChange} error={!!errors.pname} helperText={errors.pname} />
                    </div>

                    <div className="col-lg-6">
                        <FormControl fullWidth size="medium" error={!!errors.category}>
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
                        <TextField fullWidth label="Description" name="description" multiline rows={4} className="mb-3" onChange={handleChange} error={!!errors.description} helperText={errors.description} />
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
            );
            case 1: return <ImageUploader mainImage={mainImage}
                galleryImage={galleryImage}
                setMainImage={setMainImage}
                setGalleryImage={setGalleryImage} />


            case 2: return <WeightsOption productName={form.pname} weightOptions={weightOptions} setWeightOptions={setWeightOptions} />

            case 3: return <SepcifiactionsForm specifications={specifications} setSepciciaction={setSpecifications} />

            case 4: return <NutritentsInfo nutrition={nutrition} setNutrition={setNutrition} />

            case 5: return <SeoForm setSeo={setSeo} />

            case 6:
                return (
                    <div className="p-3">

                        <h4>Review Product</h4>

                        <p><b>Name:</b> {form.pname}</p>
                        <p><b>Description:</b> {form.description}</p>
                        <p><b>Category:</b> {form.category.cname}</p>

                        <p><b>Variants:</b> {weightOptions.length}</p>

                        <p><b>Main Image:</b> {mainImage ? "Uploaded" : "Missing"}</p>

                    </div>
                );
        }
    }
    return (
        <form onSubmit={submitHandler} className={`${formStyles.adminCard} p-4`}>
            <Stepper activeStep={activeStep} alternativeLabel className="mb-4">
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
            >

                {renderStep()}

            </motion.div>

            <div className="d-flex justify-content-between mt-4">
                <Button
                    disabled={activeStep === 0}
                    onClick={prevStep}
                >
                    Back
                </Button>

                {activeStep === steps.length - 1 ? (

                    <Button type="submit" variant="contained">
                        Create Product
                    </Button>

                ) : (

                    <Button onClick={nextStep} variant="contained">
                        Next
                    </Button>

                )}

            </div>
        </form>
    )
}

export default ProductForm