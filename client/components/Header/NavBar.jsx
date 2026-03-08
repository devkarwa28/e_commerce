"use client";
import headerStyles from './header.module.css'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
const NavBar = () => {
    const {user} = useAuth();
    const categories = ["Shop","Jumbo Nuts","Snacking","Dates","Combos","Seeds","Berries","Spices","Wholesale","Blog",];
    return (
        <nav className={`${headerStyles.navBar} navbar navbar-expand-lg border-bottom border-top`}>
            <div className="container">
                <ul className='navbar-nav gap-4'>
                    {
                        categories.map((cat) => (
                            <li key={cat} className='nav-item'><a href="">{cat}</a></li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

export default NavBar