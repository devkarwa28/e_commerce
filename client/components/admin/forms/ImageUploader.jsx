"use client";

import { useState } from "react";
import imgUploadStyle from './forms.module.css'
import { Button, IconButton } from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

const ImageUploader = ({ setMainImage, setGalleryImage }) => {

    const [mainImgpreview, setMainImgPreview] = useState();
    const [galleryImgPreview, setGalleryImgPreview] = useState([]);

    const handleMainImage = (e) => {
        const file = e.target.files[0];
        setMainImage(file);
        setMainImgPreview(URL.createObjectURL(file));
    }
    const handleGalleryImage = (e) => {
        const files = Array.from(e.target.files);
        setGalleryImage(files);

        const urls = files.map(file => URL.createObjectURL(file));
        setGalleryImgPreview(urls);

    }

    const removeImage = (index) => {
        const updatePreview = [...galleryImgPreview];
        updatePreview.splice(index, 1);
        setGalleryImgPreview(updatePreview);
    }


    return (
        <div className="row mt-4">

            <div className="col-lg-12">
                <h5 className="mb-3">Main Product Image</h5>
                <div className={imgUploadStyle.imgUpBox}>
                    <Button variant="contained"  component="label" startIcon={<CloudUpload />}>
                    Upload Main Image
                    <input hidden accept="image/*" onChange={handleMainImage} type="file"/>
                    </Button>
                </div>
            </div>

            {
                mainImgpreview && (
                    <div className="col-lg-2 my-3">
                        <div className={imgUploadStyle.imgBox}>
                            <img src={mainImgpreview} alt="" />
                        </div>
                    </div>
                )
            }


            <div className="col-lg-12 mt-5">
                <h5 className="mb-3">Gallery Images</h5>
                <div className={imgUploadStyle.imgUpBox}>
                    <Button variant="contained" component="label" startIcon={<CloudUpload />} >
                        Upload Images
                        <input hidden type="file" multiple accept="image/*" onChange={handleGalleryImage} />
                    </Button>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="row">
                    {
                        galleryImgPreview.map((img, i) => (
                            <div className="col-lg-2 my-3" key={i}>
                                <div className={imgUploadStyle.imgBox}>
                                    <img src={img} alt="" />
                                    <IconButton size="small" onClick={() => removeImage(i)} className={imgUploadStyle.iconBtn}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageUploader