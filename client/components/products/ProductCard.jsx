"use client";
import { Alert, Button, Card, CardContent, Divider, IconButton, Rating, Snackbar } from "@mui/material";
import productcardStyles from "./products.module.css";
import { FavoriteBorder, FavoriteBorderOutlined, ShoppingCart, Visibility } from "@mui/icons-material";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";


const ProductCard = ({ product }) => {

  const [loading, setLoading] = useState(false);
  const [openToast, setOpenToast] = useState({ open: false, message: "", severity: "success" })
  const [wished, setWished] = useState()

  const startingOption = product.weightOptions?.[0];
  const price = startingOption?.price || product.baseprice;
  const mrp = startingOption?.mrp || product.baseMRP;

  const discount = mrp && price ? Math.round(((mrp - price) / mrp) * 100) : null;

  const { addToCart } = useCart();
  const { user } = useAuth();

  const router = useRouter();

  const handlAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (!startingOption) {
      return;
    }
    setLoading(true)
    try {
      await addToCart(product._id, startingOption.label, 1);
      setOpenToast({ open: true, message: "Added to cart", severity: "success" });
    }
    catch (err) {
      setOpenToast({ open: true, message: "Failed to add. Try again.", severity: "error" });
    }
    setLoading(false);
  }





  return (
    <>
    <Card className={productcardStyles.productCard}>

      <div className={productcardStyles.imageSection}>

        <img src={product.mainImage} alt={product.pname} className={productcardStyles.mainImg} />

        <div className={productcardStyles.imgOverlay} />

        <div className={productcardStyles.offerBadge}>
          {
            discount && (
              <span className={productcardStyles.badgeDiscount}>{discount}% OFF</span>
            )
          }

          {
            product.isFeatured && (
              <span className={productcardStyles.badgeFeatured}>✦ Featured</span>
            )
          }
        </div>
        <button
          className={`${productcardStyles.wishBtn} ${wished ? productcardStyles.wishActive : ""}`}
          onClick={(e) => { e.preventDefault(); setWished(!wished); }}
          aria-label="Wishlist"
        >
          <FavoriteBorder style={{ fontSize: 16 }} />
        </button>

        <div className={productcardStyles.quickVeiw}>
          <Link href={`/products/${product.slug}`} className={productcardStyles.quickViewBtn}>
            <Visibility style={{ fontSize: 15, marginRight: 5 }} />
            Quick View
          </Link>
        </div>
      </div>

      <CardContent className={productcardStyles.CardContent}>
        {
          product.category?.cname && (
            <span className={productcardStyles.categoryName}>{product.category.cname}</span>
          )
        }
        <h3 className={productcardStyles.productName}>{product.pname}</h3>

        <div className={productcardStyles.ratingRow}>
          <Rating
            value={product.ratings || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{ color: "#C89B3C", fontSize: "13px" }}
          />
          <span className={productcardStyles.ratingCount}>({product.numReviews || 0})</span>
        </div>

        {product.weightOptions?.length > 0 && (
          <div className={productcardStyles.weightRow}>
            {product.weightOptions.slice(0, 3).map((opt, i) => (
              <span key={i} className={productcardStyles.weightPill}>{opt.label}</span>
            ))}
            {product.weightOptions.length > 3 && (
              <span className={productcardStyles.weightMore}>+{product.weightOptions.length - 3} more</span>
            )}
          </div>
        )}

        <Divider></Divider>

        <div className={productcardStyles.priceSection}>
          <div className={productcardStyles.priceBlock}>
            <span className={productcardStyles.price}>₹{price}</span>
            {mrp && <span className={productcardStyles.mrp}>₹{mrp}</span>}
          </div>

          <Button
            className={productcardStyles.addToCart}
            variant="contained"
            onClick={handlAddToCart}
            disabled={loading}
          >
            <ShoppingCart style={{ fontSize: 16 }} />
            <span>{loading ? "..." : "Add"}</span>
          </Button>
        </div>



      </CardContent>
    </Card>
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
                >
                    {openToast.message}
                </Alert>
            </Snackbar>
    </>
  )
}

export default ProductCard