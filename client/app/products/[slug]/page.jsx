import ProductDetailsClient from "./ProductDetailsClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`,
            {next: {revalidate: 300}}
        );
        if(!res.ok) throw new Error();

        const product = res.json();

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
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`,
            {
                next: { revalidate: 300 }
            }
        );

        const product = await res.json();

        return <ProductDetailsClient product={product} />;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            notFound();
        }
        return <ProductDetailsClient product={null} />;
    }
}