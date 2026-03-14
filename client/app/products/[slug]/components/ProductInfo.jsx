"use client";
import { Alert, Button, Rating, Snackbar } from '@mui/material';
import productinfoStyles from './productDetail.module.css'
import { useState } from 'react';
import PinCodeChecker from './PinCodeChecker';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const ProductInfo = ({ product }) => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(product.weightOptions[0]);
    const [qty, setQty] = useState(1);
    const [openToast, setOpenToast] = useState({ open: false, message: "", severity: "success" })
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();
    const { addToCart } = useCart();

    const handleAddToCart = async () => {

        if (!user) {
            router.push("/login");
            return;
        }
        setLoading(true)
        try {
            await addToCart(product._id, selectedOption.label, qty)
            setOpenToast({ open: true, message: "Product added to cart 🛒", severity: "success" })
        }
        catch (err) {
            setOpenToast({ open: true, message: "Failed to add to cart. Try again.", severity: "Error" })
        }
        setLoading(false)

    }

    const handleBuyNow = async () => {
        if (!user) {
            router.push("/login");
        }
        setLoading(true)
        try {
            await addToCart(product._id, selectedOption.label, qty);
            router.push("/checkout");
        }
        catch (err) {
            setOpenToast({ open: true, message: "Something Went Wrong", severity: "error" })
        }
        setLoading(false);
    }

    const discount = selectedOption.mrp && selectedOption.price ? Math.round(((selectedOption.mrp - selectedOption.price) / selectedOption.mrp) * 100) : null;


    return (
        <div className={`${productinfoStyles.productInfo} ps-2`}>
            <h2 className='fw-bold'>{product.pname}</h2>
            <Rating value={product.ratings} readOnly sx={{ color: "#c89b3c" }} />

            <div className='mt-3'>
                <h3 style={{ color: "#5c4033", margin: 0 }}>₹{selectedOption.price}</h3>
                {
                    selectedOption.mrp && (
                        <p style={{ textDecoration: "line-through", color: "#999", margin: 0 }}>
                            ₹{selectedOption.mrp}
                        </p>
                    )
                }

                {
                    discount && (
                        <span style={{
                            background: "#e8f5e9",
                            color: "#2e7d32",
                            padding: "2px 10px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: 600
                        }}>
                            {discount}% OFF
                        </span>
                    )
                }
                <p style={{ fontSize: "13px", marginTop: "6px", color: selectedOption.stock > 0 ? "#2e7d32" : "#c62828" }}>
                {
                    selectedOption.stock > 10 ? "✓ In Stock" : selectedOption.stock > 0 ? `⚠ Only ${selectedOption.stock} left` : "✗ Out of Stock"
                }

            </p>
            </div>

            

            <div className='mt-2'>
                <p className='fw-fw-semibold'>Select Weight</p>
                <div className='d-flex gap-2 flex-wrap'>
                    {
                        product.weightOptions.map((opt, index) => (
                            <Button
                                key={index}
                                variant={selectedOption.label === opt.label ? "contained" : "outlined"}
                                className={productinfoStyles.weightBtn}
                                style={{
                                    backgroundColor: selectedOption.label === opt.label ? "#5c4033" : "transparent", borderColor: "#5c4033",
                                    color: selectedOption.label === opt.label ? "#fff" : "#5c4033",
                                }}
                                onClick={() => {
                                    setSelectedOption(opt)
                                    setQty(1)
                                }}>

                                {opt.label}
                            </Button>
                        ))
                    }
                </div>
            </div>

            <div className='mt-4'>
                <p className='fw-semibold mb-2'>Quantity</p>
                <div className='d-flex align-items-center gap-3'>
                    <Button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} variant='outlined'
                        sx={{ minWidth: "36px", borderColor: "#5c4033", color: "#5c4033" }}>
                        -
                    </Button>

                    <span style={{ fontWeight: 600, fontSize: "16px", minWidth: "24px", textAlign: "center" }}>
                        {qty}
                    </span>

                    <Button onClick={() => setQty(qty < selectedOption.stock ? qty + 1 : qty)} variant='outlined' sx={{ minWidth: "36px", borderColor: "#5c4033", color: "#5c4033" }}>
                        +
                    </Button>
                </div>
            </div>

            <div className='mt-3 d-flex gap-3'>
                <Button fullWidth variant='contained' onClick={handleAddToCart} disabled={loading || selectedOption.stock === 0} >
                    {loading ? "Adding..." : "Add To Cart"}
                </Button>

                <Button fullWidth onClick={handleBuyNow} disabled={loading || selectedOption.stock === 0} variant='outlined' sx={{ borderColor: "#5c4033", color: "#5c4033" }}>
                    Buy Now
                </Button>
            </div>
            <PinCodeChecker />
            <Snackbar
                open={openToast.open}
                autoHideDuration={3000}
                onClose={() => setOpenToast({ ...openToast, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    severity={openToast.severity}
                    variant="filled"
                    onClose={() => setOpenToast({ ...openToast, open: false })}
                    sx={{ width: "100%" }}
                >
                    {openToast.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ProductInfo