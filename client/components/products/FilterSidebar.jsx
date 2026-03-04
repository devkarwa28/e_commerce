"use client";

import { CheckBox } from "@mui/icons-material";
import { Button, checkboxClasses, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Slider, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const FilterSidebar = ({filters,setFilters}) => {
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/api/category")
        .then(res=> setCategories(res.data))
        .catch(err=>console.log(err));
    },[]);

    const priceHandler = (event,newValue) =>{
        setFilters({...filters,minPrice: newValue[0],maxPrice:newValue[1]})
    }
    const clearFilters = () =>{
        setFilters({category:"",minPrice:"",maxPrice:"",featured:"",sort:"",search:""})
    }

  return (
    <div>
        <h5 className="mb-3">Filters</h5>

        <TextField label="Search" fullWidth size="small" className="mb-3" value={filters.search || ""} onChange={(e)=>setFilters({...filters, search: e.target.value})} />

        <FormControl fullWidth size="small" className="mb-3">
            <InputLabel>Category</InputLabel>
            <Select value={filters.category} label="Category" onChange={(e)=>setFilters({...filters,category: e.target.value})}>
                <MenuItem value="">All</MenuItem>
                {
                    categories.map(cat=>(
                        <MenuItem key={cat._id} value={cat._id}>{cat.cname}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>

        <div className="mb-3">
            <p className="fw-bold">Price Range</p>
            <Slider value={[filters.minPrice || 0, filters.maxPrice || 2000]} min={0} max={5000} onChange={priceHandler} valueLabelDisplay="auto" sx={{color:"#c89b3c"}} />
        </div>

        <TextField label="Min Price" type="number" fullWidth size="small" className="mb-3" value={filters.minPrice} onChange={(e)=> setFilters({...filters,minPrice: e.target.value})}/>

        <TextField label="Max Price" type="number" fullWidth size="small" className="mb-3" value={filters.maxPrice} onChange={(e)=>setFilters({...filters,maxPrice: e.target.value})} />

         <FormControl fullWidth size="small" className="mb-3">
            <InputLabel>Sort By</InputLabel>
            <Select value={filters.sort || ""} label="Sort By" onChange={(e)=>setFilters({...filters,sort: e.target.value})}>
                <MenuItem value="">Newest</MenuItem>
                <MenuItem value="price_low">Price: Low To High</MenuItem>
                <MenuItem value="price_high">Price: High To Low</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
            </Select>
        </FormControl>
        
        <FormControlLabel className="mb-3" control={ <CheckBox checked={filters.featured === "true"} onChange={(e)=>setFilters({...filters,featured: e.target.checked ? "true" : ""})} />} label="Featured Only" />
        <Button fullWidth variant="outlined" sx={{borderColor:"#5c4033",color:"#5c4033"}} onClick={clearFilters}>Clear Filters</Button>
    </div>
  )
}

export default FilterSidebar