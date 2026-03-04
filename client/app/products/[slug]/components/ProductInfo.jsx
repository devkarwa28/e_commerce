"use client";
import { Button, Rating, TextField } from '@mui/material';
import productinfoStyles from './productDetail.module.css'
import { useState } from 'react';
import PinCodeChecker from './PinCodeChecker';

const ProductInfo = ({ product }) => {
    const [selectedOption, setSelectedOption] = useState(product.weightOptions[0]);
    const [qty, setQty] = useState(1);
    return (
        <div className={`${productinfoStyles.productInfo} ps-2`}>
            <h2 className='fw-bold'>{product.pname}</h2>
            <Rating value={product.ratings} readOnly sx={{ color: "#c89b3c" }} />

            <div className='mt-3'>
                <h3 style={{ color: "#5c4033" }}>₹{selectedOption.price}</h3>
                <h3>
                    {
                        selectedOption.mrp && (
                            <p style={{ textDecoration: "line-through" }}>₹{selectedOption.mrp}</p>
                        )
                    }
                </h3>
            </div>

            <div className='mt-4'>
                <p className='fw-fw-semibold'>Select Weight</p>
                <div className='d-flex gap-2 flex-wrap'>
                    {
                        product.weightOptions.map((opt, index) => (
                            <Button key={index} variant={selectedOption.label === opt.label ? "contained" : "outlined"} className={productinfoStyles.weightBtn} style={{ backgroundColor: selectedOption.label === opt.label ? "#5c4033" : "transparent" }} onClick={() => setSelectedOption(opt)}>
                                {opt.label}
                            </Button>
                        ))
                    }
                </div>
            </div>

            <div className='mt-4 d-flex align-items-center gap-3'>
                <Button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} variant='outlined'>
                    -
                </Button>
                <span>{qty}</span>
                <Button onClick={() => setQty(qty + 1)} variant='outlined'>
                    +
                </Button>
            </div>

            <div className='mt-3 d-flex gap-3'>
                <Button fullWidth variant='contained' >
                    Add To Cart
                </Button>

                <Button fullWidth variant='outlined' sx={{ borderColor: "#5c4033", color: "#5c4033" }}>
                    Buy Now
                </Button>
            </div>
           <PinCodeChecker/>
        </div>
    )
}

export default ProductInfo