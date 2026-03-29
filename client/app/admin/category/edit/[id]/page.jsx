"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import {
    Button,
    TextField,
    CircularProgress,
    Alert,
    IconButton,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { ArrowBack, CloudUpload, Close } from "@mui/icons-material";

const EditCategoryPage = () => {
    const { id } = useParams();
    const [cname, setCname] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const fileInputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/category/${id}`, {
                    withCredentials: true,
                });
                const cat = res.data;
                setCname(cat.cname || "");
                setIsActive(cat.isActive ?? true);
                if (cat.image) setPreview(cat.image);
            } catch (err) {
                setError("Failed to load category.");
            }
            setFetching(false);
        };
        fetchCategory();
    }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!cname.trim()) {
            setError("Category name is required.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("cname", cname.trim());
            formData.append("isActive", String(isActive));
            if (image) formData.append("image", image);

            await axios.put(`http://localhost:5000/api/category/${id}`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccess("Category updated successfully!");
            setTimeout(() => router.push("/admin/category"), 1200);
        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong. Please try again."
            );
        }
        setLoading(false);
    };

    if (fetching) {
        return (
            <section className="container py-4">
                <div className="admin-card d-flex justify-content-center py-5">
                    <CircularProgress sx={{ color: "#5C4033" }} />
                </div>
            </section>
        );
    }

    return (
        <section className="container py-4">
            <div className="admin-card">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <IconButton
                        onClick={() => router.push("/admin/category")}
                        sx={{
                            backgroundColor: "#f5f0eb",
                            "&:hover": { backgroundColor: "#ebe4dc" },
                        }}
                    >
                        <ArrowBack sx={{ color: "#5C4033" }} />
                    </IconButton>

                    <div>
                        <h2 style={{ margin: 0, color: "#5C4033", fontWeight: 600 }}>
                            Edit Category
                        </h2>
                        <p
                            style={{
                                margin: 0,
                                color: "#6C6C6C",
                                fontSize: 14,
                                marginTop: 2,
                            }}
                        >
                            Update the details of this category
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

                {success && (
                    <Alert
                        severity="success"
                        sx={{ mb: 3, borderRadius: 2 }}
                    >
                        {success}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        className="mb-3"
                        label="Category Name"
                        value={cname}
                        onChange={(e) => setCname(e.target.value)}
                        size="small"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "#3E7C59",
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                        backgroundColor: "#3E7C59",
                                    },
                                }}
                            />
                        }
                        label={
                            <span>
                                Active{" "}
                                <span style={{ color: isActive ? "#3E7C59" : "#B23A3A", fontWeight: 600 }}>
                                    ({isActive ? "Visible" : "Hidden"})
                                </span>
                            </span>
                        }
                        sx={{ mb: 3, display: "flex" }}
                    />

                    <label
                        style={{
                            display: "block",
                            fontWeight: 500,
                            color: "#1A1A1A",
                            marginBottom: 8,
                            fontSize: 14,
                        }}
                    >
                        Category Image{" "}
                        <span style={{ color: "#6C6C6C", fontWeight: 400 }}>
                            (optional)
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
                            }}
                        >
                            <img
                                src={preview}
                                alt="Preview"
                                style={{
                                    width: 180,
                                    height: 180,
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
                            onClick={() => router.push("/admin/category")}
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
                                "Update Category"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditCategoryPage;