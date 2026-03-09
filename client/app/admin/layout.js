"use client";

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

const Adminlayout = ({children}) => {
  return (
    <main className="admin-layout">
        <Sidebar/>
        <div className="admin-main">
            <Topbar/>
            <div className="admin-content">
                {children}
            </div>
        </div>
    </main>
  )
}

export default Adminlayout