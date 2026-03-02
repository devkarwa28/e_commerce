"use client";
import FilterSidebar from "@/components/products/FilterSidebar";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductsPage = () => {
    const [products,setProducts] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [mobileOpen,setMobileOpen] = useState(false);
    const [filters,setFilters] = useState({category:"",minPrice:"",maxPrice:"",featured:""});
    
    const fetchProducts = async () =>{
        try{
            const res = await axios.get("http://localhost:5000/api/products",{params:{...filters,page}});
            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
        }
        catch(err){
            console.log(err);
        }
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

            </div>
        </div>
    </div>
    </>
  )
}

export default ProductsPage;