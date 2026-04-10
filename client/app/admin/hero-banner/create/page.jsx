"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    Button,
    TextField,
    CircularProgress,
    Alert,
    IconButton,
    FormControlLabel,
    Switch
} from "@mui/material";
import { ArrowBack, CloudUpload, Close } from "@mui/icons-material";

const CreateBannerPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        titleAccent: "",
        subtitle: "",
        badge: "",
        active: true
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);
    const router = useRouter();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5MB.");
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
        setError("");
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.title.trim()) {
            setError("Title is required.");
            return;
        }

        if (!image) {
            setError("Banner image is required.");
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append("title", formData.title.trim());
            if (formData.titleAccent) data.append("titleAccent", formData.titleAccent.trim());
            if (formData.subtitle) data.append("subtitle", formData.subtitle.trim());
            if (formData.badge) data.append("badge", formData.badge.trim());
            data.append("active", formData.active);
            data.append("image", image);

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/banners`, data, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            router.push("/admin/hero-banner");
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || "Something went wrong. Please try again");
        }
        setLoading(false);
    };

    return (
        <section className="container py-4" >
            <div className="admin-card">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <IconButton
                        onClick={() => router.push("/admin/hero-banner")}
                        sx={{
                            backgroundColor: "#f5f0eb",
                            "&:hover": { backgroundColor: "#ebe4dc" },
                        }}
                    >
                        <ArrowBack sx={{ color: "#5C4033" }} />
                    </IconButton>


                    <div>
                        <h2 style={{ margin: 0, color: "#5C4033", fontWeight: 600 }}>
                            Create Banner Slide
                        </h2>
                        <p
                            style={{
                                margin: 0,
                                color: "#6C6C6C",
                                fontSize: 14,
                                marginTop: 2,
                            }}
                        >
                            Add a new hero banner to your home page
                        </p>
                    </div>
                </div>

                {error && (
                    <Alert
                        severity="error"
                        onClose={() => setError("")}
                        sx={{ mb: 3, borderRadius: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                size="small"
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <TextField
                                fullWidth
                                label="Title Accent (Highlighted Word)"
                                name="titleAccent"
                                value={formData.titleAccent}
                                onChange={handleChange}
                                size="small"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <TextField
                                fullWidth
                                label="Subtitle"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                size="small"
                                multiline
                                rows={2}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <TextField
                                fullWidth
                                label="Badge Text (e.g. New Arrival)"
                                name="badge"
                                value={formData.badge}
                                onChange={handleChange}
                                size="small"
                            />
                            <div className="mt-3">
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={formData.active} 
                                            onChange={handleChange} 
                                            name="active" 
                                            color="primary"
                                        />
                                    }
                                    label="Active Status"
                                />
                            </div>
                        </div>
                    </div>

                    <label
                        style={{
                            display: "block",
                            fontWeight: 500,
                            color: "#1A1A1A",
                            marginBottom: 8,
                            fontSize: 14,
                            marginTop: 16
                        }}
                    >
                        Banner Image <span style={{ color: "#E53935" }}>*</span>
                        <span style={{ color: "#6C6C6C", fontWeight: 400, marginLeft: "8px" }}>
                            (Recommended aspect ratio: 16:9 or 21:9)
                        </span>
                    </label>

                    {!preview ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                border: "2px dashed #d4ccc4",
                                borderRadius: 12,
                                padding: "40px 20px",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 300ms ease",
                                backgroundColor: "#faf8f6",
                            }}
                        >
                            <CloudUpload
                                sx={{ fontSize: 40, color: "#5C4033", mb: 1 }}
                            />
                            <p
                                style={{
                                    margin: 0,
                                    color: "#5C4033",
                                    fontWeight: 500,
                                    fontSize: 15,
                                }}
                            >
                                Click to upload image
                            </p>
                            <p
                                style={{
                                    margin: "4px 0 0",
                                    color: "#6C6C6C",
                                    fontSize: 13,
                                }}
                            >
                                PNG, JPG or WEBP — Max 5MB
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                position: "relative",
                                display: "inline-block",
                                borderRadius: 12,
                                overflow: "hidden",
                                border: "2px solid #e5e0da",
                                width: "100%",
                                maxWidth: "600px"
                            }}
                        >
                            <img
                                src={preview}
                                alt="Preview"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                            <IconButton
                                onClick={removeImage}
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 6,
                                    right: 6,
                                    backgroundColor: "rgba(0,0,0,0.55)",
                                    color: "#fff",
                                    "&:hover": { backgroundColor: "rgba(0,0,0,0.75)" },
                                }}
                            >
                                <Close fontSize="small" />
                            </IconButton>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />

                    <div className="d-flex justify-content-end gap-2" style={{ marginTop: 32 }}>
                        <Button
                            variant="outlined"
                            onClick={() => router.push("/admin/hero-banner")}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={22} sx={{ color: "#fff" }} />
                            ) : (
                                "Create Banner"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateBannerPage;
