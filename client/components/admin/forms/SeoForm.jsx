"use client";

import { TextField } from "@mui/material";

const SeoForm = ({ seo, setSeo }) => {

    const handleChange = (e) => {
        setSeo({ ...seo, [e.target.name]: e.target.value });
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
                    value={seo.metaTitle || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-6 mb-3">
                <TextField
                    label="Meta Keywords (comma separated)"
                    name="metaKeywords"
                    fullWidth
                    size="small"
                    value={seo.metaKeywords}
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
                    value={seo.metaDescription}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-6 mb-3">
                <TextField
                    label="Open Graph Title"
                    name="ogTitle"
                    fullWidth
                    size="small"
                    value={seo.ogTitle}
                    onChange={handleChange}
                />
            </div>

            <div className="col-lg-6 mb-3">
                <TextField
                    label="Open Graph Image URL"
                    name="ogImage"
                    fullWidth
                    size="small"
                    value={seo.ogImage}
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
                    value={seo.ogDescription}
                    onChange={handleChange}
                />
            </div>

        </div>
    )
}

export default SeoForm