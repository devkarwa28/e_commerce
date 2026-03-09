"use client";

import { Category, Dashboard, Inventory, LocalOffer, ShoppingBag } from "@mui/icons-material";
import adminSideStyles from './admin.module.css'
import { usePathname } from "next/navigation";
import Link from "next/link";


const Sidebar = () => {
    const path = usePathname();
    const menu = [
        { label: "Dashboard", href: "/admin", icon: <Dashboard /> },
        { label: "Products", href: "/admin/products", icon: <Inventory /> },
        { label: "Categories", href: "/admin/categories", icon: <Category /> },
        { label: "Orders", href: "/admin/orders", icon: <ShoppingBag /> },
        { label: "Coupons", href: "/admin/coupons", icon: <LocalOffer /> },
    ];
    return (
        <div className={adminSideStyles.adminSidebar}>
            <h4>Admin Panel</h4>
            {
                menu.map(item=>(
                    <Link key={item.label} href={item.href} className={`${adminSideStyles.sideLink} ${path === item.href ? "active" : ""}`}>
                    {item.icon} <span>{item.label}</span>
                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar