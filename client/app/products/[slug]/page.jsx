"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import BenifitsIcon from './components/BenifitsIcon';
import productStyles from './components/productDetail.module.css';

const ProductDetailsPage = () => {
    const {slug} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if(slug) {
            fetchProducts();
        }
    }, [slug])

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`);
            setProduct(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    if(!product) {
        return (
            <div className={productStyles.pageWrapper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ fontSize: '18px', fontWeight: '600' }}>Loading luxury experience...</p>
            </div>
        )
    }
    
    return (
        <div className={productStyles.pageWrapper}>
            <div className='container'>
                <div className='row g-5 align-items-start'>
                    <div className="col-lg-6">
                        <ProductGallery product={product} />
                    </div>

                    <div className='col-lg-6'>
                        <ProductInfo product={product} />
                    </div>
                </div>
                <BenifitsIcon />
                <ProductTabs product={product} />
            </div>
        </div>
    )
}

export default ProductDetailsPage; 