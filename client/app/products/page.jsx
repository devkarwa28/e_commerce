"use client";
import styles from "./products.module.css";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { Button, Drawer, IconButton, Box, Typography } from "@mui/material";
import { FilterList, Close, Inventory2Outlined } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const ProductsPage = () => {
    const [page, setPage] = useState(1);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [filters, setFilters] = useState({ category: "", minPrice: "", maxPrice: "", featured: "", inStock: "", sort: "", search: "" });
    const router = useRouter();

    const fetchProducts = async ({queryKey}) =>{
        console.log("API called");
        const [,page,filters] = queryKey;

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`,{params: {...filters,page}})
        return res.data;
    }
    
    const {data,isLoading,error} = useQuery({
        queryKey: [`products`,page,filters],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5,
        keepPreviousData: true,
        placeholderData: (prevData) => prevData,
        refetchOnWindowFocus: false,
    });

    return (
        <div style={{ paddingBottom: "3rem", paddingTop: "1rem" }}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Our Premium Collection</h1>
                <p className={styles.pageSubtitle}>
                    Discover our finest selection of organic dry fruits, roasted nuts, and delicious healthy snacks picked just for you.
                </p>
            </div>

            <div className="d-lg-none">
                <Button 
                    variant="contained" 
                    className={styles.filterToggleBtn}
                    onClick={() => setMobileOpen(true)}
                >
                    <FilterList /> Filter Products
                </Button>
            </div>

            <div className="row">
                <div className="col-lg-3 d-none d-lg-block">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                </div>

                <div className="col-lg-9">
                    <div className="row">
                        {isLoading ? (
                            Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="col-xl-4 col-md-4 col-6 mb-4">
                                    <ProductCardSkeleton />
                                </div>
                            ))
                        ) : data?.products?.length > 0 ? (
                            data?.products?.map(product => (
                                <div key={product._id} className="col-xl-4 col-md-4 col-6 mb-4">
                                    <ProductCard product={product} />
                                </div>
                            ))
                        ) : (
                            <div className={styles.noProducts}>
                                <Inventory2Outlined />
                                <h3 className={styles.noProductsTitle}>No Products Found</h3>
                                <p className={styles.noProductsDesc}>Try adjusting your filters to find what you're looking for.</p>
                                <Button 
                                    variant="outlined" 
                                    sx={{ mt: 2, borderColor: '#5c4033', color: '#5c4033' }}
                                    onClick={() => setFilters({ category: "", minPrice: "", maxPrice: "", featured: "", inStock: "", sort: "", search: "" })}
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        )}
                    </div>

                    {!isLoading && data?.totalPages > 1 && (
                        <div className={styles.paginationWrapper}>
                            {Array.from({ length: data?.totalPages || 0 }).map((_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => setPage(index + 1)}
                                    variant={page === index + 1 ? "contained" : "outlined"}
                                    className={`${styles.pageBtn} ${page === index + 1 ? styles.pageBtnActive : styles.pageBtnInactive}`}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: "0 24px 24px 0",
                        backgroundColor: "#fcf9f6"
                    }
                }}
            >
                <div className={styles.mobileDrawerWrapper}>
                    <div className={styles.drawerHeader}>
                        <Typography className={styles.drawerTitle}>
                            <FilterList sx={{ mr: 1, verticalAlign: 'bottom' }} /> Filters
                        </Typography>
                        <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#5c4033' }}>
                            <Close />
                        </IconButton>
                    </div>
                    <Box sx={{ p: 2 }}>
                        <FilterSidebar filters={filters} setFilters={setFilters} />
                    </Box>
                    <Box sx={{ p: 2, borderTop: "1px solid rgba(92, 64, 51, 0.08)", background: "#FFF", position: "sticky", bottom: 0, zIndex: 10 }}>
                        <Button 
                            variant="contained" 
                            fullWidth 
                            onClick={() => setMobileOpen(false)}
                            sx={{
                                backgroundColor: '#5c4033',
                                color: 'white',
                                py: 1.5,
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: '1rem',
                                '&:hover': { backgroundColor: '#4a332a' }
                            }}
                        >
                            Apply Filters
                        </Button>
                    </Box>
                </div>
            </Drawer>
        </div>
    );
};

export default ProductsPage;