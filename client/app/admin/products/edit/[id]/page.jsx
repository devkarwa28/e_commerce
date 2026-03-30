"use client";

import ProductForm from '@/components/admin/forms/ProductForm';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProductEditPage = () => {
    const {id} = useParams();
    const [product,setProduct] = useState(null);

    const fetchProduct = async () =>{
        try{
            const res = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/api/products/admin/${id}`);

            setProduct(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchProduct();
    },[])

  return (
    <section className="container py-4">

      <h2 className="mb-4">Edit Product</h2>

      <ProductForm editData={product} />

    </section>
  )
}

export default ProductEditPage