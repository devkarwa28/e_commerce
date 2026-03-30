"use client";

import ProductForm from '@/components/admin/forms/ProductForm';
import React from 'react'

const CreateProductPage = () => {
  return (
    <section className="container py-5" style={{ padding: "40px 20px", maxWidth: "1000px" }}>
        <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 800, color: "var(--color-primary, #5c4033)", margin: "0 0 8px 0", letterSpacing: "-1px" }}>Product Creator</h2>
            <p style={{ fontSize: "16px", color: "var(--color-text-secondary, #666)", margin: 0, fontWeight: 500 }}>Follow the steps to configure a beautiful new product for the catalog.</p>
        </div>

        <ProductForm />
    </section>
  )
}

export default CreateProductPage;