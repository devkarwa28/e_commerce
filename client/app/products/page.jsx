"use client";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductsPage = () => {
    const [products,setProducts] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [mobileOpen,setMobileOpen] = useState(true);
    const [loading,setLoading] = useState(true);
    const [filters,setFilters] = useState({category:"",minPrice:"",maxPrice:"",featured:"",inStock: ""});
    
    const fetchProducts = async () =>{
        setLoading(true)
        try{
            const res = await axios.get("http://localhost:5000/api/products",{params:{...filters,page}});
            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
        }
        catch(err){
            console.log(err);
        }
        setLoading(false)
    };

    useEffect(()=>{
        fetchProducts();  
    },[page,filters])
  return (
    <>
    <div className="mb-4">
        <h2 className="text-center">Our Premium Collection</h2>
    </div>
    <div className="d-lg-none mb-3">
        <Button sx={{backgroundColor: "#5c4033",color:"white"}} onClick={()=>setMobileOpen(true)}>Filters</Button>
    </div>

    <div className="row">
        <div className="col-lg-3 d-none d-lg-block">
            <FilterSidebar filters={filters} setFilters={setFilters}/>
        </div>
        <div className="col-lg-9">
            <div className="row">
                {
                    loading ? (
                        Array.from({length: 6}).map((_,index)=>(
                            <div key={index} className="col-md-4 col-sm-6 mb-4">
                                <ProductCardSkeleton />
                            </div>
                        ))
                    ) :  products.length > 0 ? (
                        products.map(product=>(
                            <div key={product._id} className="col-md-4 col-sm-6 mb-4">
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <p>No Product Found</p>
                    )
                }
            </div>
            {
                totalPages > 1 && (
                    <div className="text-center mt-4">
                        {
                            Array.from({length: totalPages}).map((_,index)=>(
                                <Button key={index} onClick={()=>setPage(index + 1)}
                                variant={page === index + 1 ? "contained":"outlined"}
                                sx={{
                                    mx:0.5,
                                    backgroundColor: page === index + 1 ? '#5c4033' : "transparent",
                                    color: page === index + 1 ? "#fff" : "#5c4033",
                                    borderColor: "#5c4033"
                                }}
                                >
                                    {index + 1}
                                </Button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    </div>
    </>
  )
}

export default ProductsPage;