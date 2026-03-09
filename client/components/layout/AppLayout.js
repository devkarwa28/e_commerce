"use client";

import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

 

const AppLayout = ({children}) => {
    const pathName = usePathname();
    const isAdmin = pathName.startsWith("/admin")
  return (
    <>
    {!isAdmin && <Header/> }
    {children}
    {!isAdmin && <Footer/>}
    </>
  )
}

export default AppLayout