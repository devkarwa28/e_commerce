"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import BenifitsIcon from './components/BenifitsIcon';

const ProductDetailsPage = () => {
    const {slug} = useParams();
    const [product,setProduct] = useState(null);

    useEffect(()=>{
        if(slug)
        {
            fetchProducts();
        }
    },[slug])

    const fetchProducts = async () =>{
        const res = await axios.get(`http://localhost:5000/api/products/${slug}`);
        setProduct(res.data);
    }

    if(!product)
    {
        return <p>Product Loading...........</p>
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className="col-lg-6">
                <ProductGallery product={product}/>
            </div>

            <div className='col-lg-6'>
                <ProductInfo product={product}/>
            </div>
        </div>
        <BenifitsIcon/>
        <ProductTabs product={product}/>
    </div>
  )
}

export default ProductDetailsPage