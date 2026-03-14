"use client";
import { Button, Card, CardContent, IconButton, Rating } from "@mui/material";
import productcardStyles from "./products.module.css";
import { FavoriteBorderOutlined, ShoppingCart, Visibility } from "@mui/icons-material";
import Link from "next/link";


const ProductCard = ({ product }) => {


   const startingOption = product.weightOptions?.[0];
  const price = startingOption?.price || product.baseprice;
  const mrp = startingOption?.mrp || product.baseMRP;

  const discount 



  return (
    <Card className={productcardStyles.productCard}>
      <div className={productcardStyles.imageSection}>
        <img src={product.mainImage} alt={product.pname} />
        <IconButton className={productcardStyles.whishlistIcon}>
          <FavoriteBorderOutlined />
        </IconButton>
      </div>

      <CardContent className={productcardStyles.CardContent}>
        <div className="d-flex justify-content-between">
          <h6>{product.pname}</h6>
          <Rating value="4" readOnly size="small" sx={{ color: "#c89b3c" }} />
        </div>
        <div className={productcardStyles.priceSection}>
          <span> ₹ {price}</span>
          {mrp && (
            <span style={{ textDecoration: "line-through", color: "#6c6c6c", fontSize: "14px" }}>₹{mrp}</span>
          )}
        </div>

        <div className="d-flex gap-2">
          <Button fullWidth variant="contained" className={productcardStyles.addtocart} startIcon={<ShoppingCart />}>Add To Cart</Button>

          <Link href={`/products/${product.slug}`} style={{textDecoration:"none", color:"white"}}>
          <IconButton className={productcardStyles.visibilityIcon}>
            <Visibility />
          </IconButton>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard