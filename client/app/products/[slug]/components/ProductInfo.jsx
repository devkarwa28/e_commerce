"use client";
import { Alert, Snackbar } from '@mui/material';
import productStyles from './productDetail.module.css';
import { useState } from 'react';
import PinCodeChecker from './PinCodeChecker';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

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
            setOpenToast({ open: true, message: "Product added to cart", severity: "success" })
        }
        catch (err) {
            setOpenToast({ open: true, message: "Failed to add to cart. Try again.", severity: "error" })
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
    const isOutOfStock = selectedOption.stock === 0;

    return (
        <div className={productStyles.infoWrap}>
            <h1 className={productStyles.productTitle}>{product.pname}</h1>

            <div className={productStyles.priceWrap}>
                <h3 className={productStyles.currentPrice}>₹{selectedOption.price}</h3>
                {selectedOption.mrp && (
                    <p className={productStyles.originalPrice}>₹{selectedOption.mrp}</p>
                )}
                {discount && (
                    <span className={productStyles.discountBadge}>{discount}% OFF</span>
                )}
            </div>

            <div className={`${productStyles.stockStatus} ${isOutOfStock ? productStyles.outStock : selectedOption.stock > 10 ? productStyles.inStock : productStyles.lowStock}`}>
                {isOutOfStock ? "✗ Out of Stock" : selectedOption.stock > 10 ? "✓ In Stock Ready to Ship" : `⚠ Only ${selectedOption.stock} left in stock`}
            </div>

            <div style={{ marginTop: '32px' }}>
                <p className={productStyles.sectionLabel}>Select Weight</p>
                <div className={productStyles.weightWrap}>
                    {product.weightOptions.map((opt, index) => (
                        <button
                            key={index}
                            className={`${productStyles.weightBtn} ${selectedOption.label === opt.label ? productStyles.active : ''}`}
                            onClick={() => {
                                setSelectedOption(opt)
                                setQty(1)
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <p className={productStyles.sectionLabel}>Quantity</p>
                <div className={productStyles.qtyWrap}>
                    <div className={productStyles.qtyControls}>
                        <button 
                            className={productStyles.qtyBtn} 
                            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                            disabled={isOutOfStock}
                        >
                            -
                        </button>
                        <span className={productStyles.qtyValue}>{qty}</span>
                        <button 
                            className={productStyles.qtyBtn} 
                            onClick={() => setQty(qty < selectedOption.stock ? qty + 1 : qty)}
                            disabled={isOutOfStock}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className={productStyles.actionBtns}>
                <button 
                    className={`${productStyles.addToCartBtn} ${(loading || isOutOfStock) ? productStyles.btnDisabled : ''}`} 
                    onClick={handleAddToCart} 
                    disabled={loading || isOutOfStock}
                >
                    <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
                    {loading ? "Adding..." : "Add To Cart"}
                </button>

                <button 
                    className={`${productStyles.buyNowBtn} ${(loading || isOutOfStock) ? productStyles.btnDisabled : ''}`} 
                    onClick={handleBuyNow} 
                    disabled={loading || isOutOfStock}
                >
                    <LocalMallOutlinedIcon sx={{ fontSize: 20 }} />
                    Buy Now
                </button>
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

export default ProductInfo;