import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientLayout from "./ClientLayout";

/** @type {import('next').Metadata} */
export const metadata = {
  title: {
    default: "Nutrivia | Premium Dry Fruits, Nuts & Healthy Snacks",
    template: "%s | Nutrivia"
  },
  description: "Experience the finest selection of premium dry fruits, nuts, and healthy snacks at Nutrivia. We provide organic, high-quality almonds, cashews, dates, and more, delivered right to your door with guaranteed freshness.",
  keywords: ["dry fruits", "premium nuts", "healthy snacks", "Nutrivia", "organic snacks", "almonds", "cashews", "walnuts", "dates", "online dry fruits store"],
  authors: [{ name: "Dev Karwa" }],
  creator: "Dev Karwa",
  publisher: "Dev Karwa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Nutrivia | Premium Dry Fruits & Nuts",
    description: "Discover the best quality dry fruits and nuts online at Nutrivia. Pure, organic, and delivered fresh.",
    url: "https://github.com/devkarwa/e_commerce ",
    siteName: "Nutrivia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutrivia | Premium Dry Fruits & Nuts",
    description: "Discover the best quality dry fruits and nuts online at Nutrivia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
