"use client";

import { Card, CardContent, Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <div>
        <Card sx={{borderRadius:3,overflow:"hidden"}}>
            <Skeleton variant="rectangular" height={220} animation="wave" />
            <CardContent>
                <Skeleton height={30} width="80%" />
                <Skeleton height={20} width="40%" />
                <Skeleton height={30} width="60%" />
                <Skeleton variant="rectangular" height={40} sx={{borderRadius:2,mt:2}}/>
            </CardContent>
        </Card>

    </div>
  )
}

export default ProductCardSkeleton