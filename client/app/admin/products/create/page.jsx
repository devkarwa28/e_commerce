"use client";

import ProductForm from '@/components/admin/forms/ProductForm';
import React from 'react'

const CreateProductPage = () => {
  return (
    <section className='container-fluid py-3'>
        <h2 className='mb-4'>Create Product</h2>
        <ProductForm/>
    </section>
  )
}

export default CreateProductPage