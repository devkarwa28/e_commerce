"use client";

import { TextField } from "@mui/material";
import { useState } from "react";

const SeoForm = ({setSeo}) => {
    const [seoData, setSeoData] = useState({
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: ""
    });
    const handleChange = (e) => {
        const update = { ...seoData, [e.target.name]: e.target.value };
        setSeoData(update);
        setSeo(update);
    };
    return (
        <div className="row mt-5">

            <div className="col-12 mb-3">
                <h5>SEO / Meta Data</h5>
                <p className="text-muted">
                    These fields help your product rank better in search engines.
                </p>
            </div>

            <div className="col-lg-6 mb-3">
                <TextField
                    label="Meta Title"
                    name="metaTitle"
                    fullWidth
                    size="small"
                    value={seoData.metaTitle}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-6 mb-3">
                <TextField
                    label="Meta Keywords (comma separated)"
                    name="metaKeywords"
                    fullWidth
                    size="small"
                    value={seoData.metaKeywords}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-12 mb-3">
                <TextField
                    label="Meta Description"
                    name="metaDescription"
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    value={seoData.metaDescription}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-6 mb-3">
                <TextField
                    label="Open Graph Title"
                    name="ogTitle"
                    fullWidth
                    size="small"
                    value={seoData.ogTitle}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-6 mb-3">
                <TextField
                    label="Open Graph Image URL"
                    name="ogImage"
                    fullWidth
                    size="small"
                    value={seoData.ogImage}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-12 mb-3">
                <TextField
                    label="Open Graph Description"
                    name="ogDescription"
                    fullWidth
                    multiline
                    rows={2}
                    size="small"
                    value={seoData.ogDescription}
                    onChange={handleChange}
                />
            </div>

        </div>
    )
}

export default SeoForm