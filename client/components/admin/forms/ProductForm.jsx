"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import formStyles from "./forms.module.css"
import { Button, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, Switch, TextField } from "@mui/material";
import ImageUploader from "./ImageUploader";
import WeightsOption from "./WeightsOption";
import SepcifiactionsForm from "./SepcifiactionsForm";
import NutritentsInfo from "./NutritentsInfo";
import SeoForm from "./SeoForm";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircleRounded, ArrowForwardRounded, ArrowBackRounded } from "@mui/icons-material";

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
    const [removedImages, setRemovedImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (!form.pname.trim()) newErrors.pname = "Product name required";
        if (!form.description.trim()) newErrors.description = "Description required";
        if (!form.category) newErrors.category = "Select category";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, { withCredentials: true });
            setCategories(res.data);
        } catch (err) {
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
        if (activeStep === 0 && !validateStep1()) return;
        setActiveStep(prev => prev + 1);
    };

    const prevStep = () => {
        setActiveStep(prev => prev - 1);
    };

    const submitHandler = async (e) => {
        e?.preventDefault();

        if (activeStep !== steps.length - 1) {
            if (activeStep === 0 && !validateStep1()) return;
            setActiveStep(prev => prev + 1);
            return;
        }

        setIsSubmitting(true);
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
            formData.append("removedImages", JSON.stringify(removedImages));

            if (editData) {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${editData._id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
                );
            } else {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
                );
            }
            router.push("/admin/products");
        } catch (err) {
            console.log(err);
            alert("An error occurred while saving the product.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const renderStep = () => {
        switch (activeStep) {
            case 0: return (
                <div style={{ display: "grid", gap: "24px", padding: "10px 0" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            name="pname"
                            onChange={handleChange}
                            value={form.pname}
                            error={!!errors.pname}
                            helperText={errors.pname}
                            variant="outlined"
                        />
                        <FormControl fullWidth error={!!errors.category}>
                            <InputLabel>Category</InputLabel>
                            <Select name="category" value={form.category} label="Category" onChange={handleChange}>
                                {categories.map((cat) => (
                                    <MenuItem key={cat._id} value={cat._id}>{cat.cname}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <TextField
                        fullWidth
                        label="Rich Description"
                        value={form.description}
                        name="description"
                        multiline
                        rows={5}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />

                    <div style={{ display: "flex", gap: "40px", marginTop: "10px", padding: "20px", background: "#FAFAFA", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ fontWeight: 700, color: "#555" }}>Featured Product</span>
                            <Switch checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} color="warning" />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ fontWeight: 700, color: "#555" }}>Active/Visible</span>
                            <Switch checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} color="success" />
                        </div>
                    </div>
                </div>
            );
            case 1: return <ImageUploader mainImage={mainImage} setMainImage={setMainImage} galleryImage={galleryImage} setGalleryImage={setGalleryImage} existingMainImage={editData?.mainImage} existingImages={editData?.images || []} setRemovedImages={setRemovedImages} />
            case 2: return <WeightsOption productName={form.pname} weightOptions={weightOptions} setWeightOptions={setWeightOptions} />
            case 3: return <SepcifiactionsForm specifications={specifications} setSepciciaction={setSpecifications} />
            case 4: return <NutritentsInfo nutrition={nutrition} setNutrition={setNutrition} />
            case 5: return <SeoForm seo={seo} setSeo={setSeo} />
            case 6:
                return (
                    <div style={{ padding: "30px", background: "#FAFAFA", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
                        <h4 style={{ color: "var(--color-primary, #5c4033)", fontWeight: 800, marginBottom: "24px" }}>Review Product Details</h4>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            <div style={{ background: "#FFF", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                                <p style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", fontWeight: 700, margin: "0 0 5px" }}>Identity</p>
                                <p style={{ fontWeight: 700, color: "#333", margin: "0 0 8px" }}>Name: <span style={{ fontWeight: 500 }}>{form.pname || "N/A"}</span></p>
                                <p style={{ fontWeight: 700, color: "#333", margin: "0 0 8px" }}>Category: <span style={{ fontWeight: 500 }}>{categories.find(c => c._id === form.category)?.cname || "N/A"}</span></p>
                            </div>
                            <div style={{ background: "#FFF", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                                <p style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", fontWeight: 700, margin: "0 0 5px" }}>Assets</p>
                                <p style={{ fontWeight: 700, color: "#333", margin: "0 0 8px" }}>Variants: <span style={{ fontWeight: 500 }}>{weightOptions.length}</span></p>
                                <p style={{ fontWeight: 700, color: "#333", margin: "0 0 8px" }}>Main Image: <span style={{ fontWeight: 800, color: mainImage || (editData && editData.mainImage) ? "var(--color-olive, #6b8e23)" : "#D32F2F" }}>{mainImage || (editData && editData.mainImage) ? "Attached" : "Missing"}</span></p>
                            </div>
                        </div>
                    </div>
                );
        }
    }

    return (
        <form onSubmit={submitHandler} style={{ background: "#FFFFFF", borderRadius: "24px", padding: "40px", boxShadow: "0 10px 40px rgba(92, 64, 51, 0.04)" }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{
                marginBottom: "40px",
                "& .MuiStepIcon-root.Mui-active": { color: "var(--color-gold, #c89b3c)" },
                "& .MuiStepIcon-root.Mui-completed": { color: "var(--color-olive, #6b8e23)" },
                "& .MuiStepLabel-label.Mui-active": { fontWeight: 800, color: "var(--color-primary, #5c4033)" }
            }}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    style={{ minHeight: "350px" }}
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", paddingTop: "24px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                <Button
                    type="button"
                    disabled={activeStep === 0}
                    onClick={prevStep}
                    startIcon={<ArrowBackRounded />}
                    sx={{ color: "#666", fontWeight: 700, padding: "10px 24px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", "&:hover": { background: "#F5F5F5" } }}
                >
                    Back
                </Button>

                {activeStep === steps.length - 1 ? (
                    <Button
                        type="button"
                        onClick={submitHandler}
                        disabled={isSubmitting}
                        variant="contained"
                        startIcon={<CheckCircleRounded />}
                        sx={{ background: "var(--color-olive, #6b8e23)", color: "#FFF", fontWeight: 800, padding: "10px 32px", borderRadius: "12px", boxShadow: "0 8px 20px rgba(107, 142, 35, 0.3)", "&:hover": { background: "#557518", transform: "translateY(-2px)", boxShadow: "0 12px 25px rgba(107, 142, 35, 0.4)" }, transition: "all 300ms ease" }}
                    >
                        {isSubmitting ? "Processing..." : (editData ? "Update Product" : "Create Product")}
                    </Button>
                ) : (
                    <Button
                        type="button"
                        onClick={nextStep}
                        variant="contained"
                        endIcon={<ArrowForwardRounded />}
                        sx={{ background: "var(--color-primary, #5c4033)", color: "#FFF", fontWeight: 700, padding: "10px 32px", borderRadius: "12px", boxShadow: "0 6px 15px rgba(92, 64, 51, 0.2)", "&:hover": { background: "#4a332a", transform: "translateY(-2px)" }, transition: "all 200ms ease" }}
                    >
                        Next Step
                    </Button>
                )}
            </div>
        </form>
    )
}

export default ProductForm;