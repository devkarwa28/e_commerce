import axios from "axios";
import ProductDetailsClient from "./ProductDetailsClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { slug } = params;

    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`
        );
        const product = res.data;

        return {
            title: product.seoTitle || product.pname,
            description: product.seoDescription || product.description,
            openGraph: {
                title: product.seoTitle,
                description: product.seoDescription,
                images: [product.mainImage],
            },
            twitter: {
                card: "summary_large_image",
                title: product.seoTitle,
                description: product.seoDescription,
                images: [product.mainImage],
            },
        };
    } catch (error) {
        return {
            title: "Product Not Found | Nutrivia",
        };
    }
}

export default async function Page({ params }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`
        );

        const product = res.data;

        return <ProductDetailsClient product={product} />;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            notFound();
        }
        return <ProductDetailsClient product={null} />;
    }
}