"use client";

import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminCategoriesPage = () => {
  const [category,setCategory] = useState([]);
  const router = useRouter();

  return (
    <section>
      <div className="admin-card"> 
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2>Categories</h2>
          <Button onClick={()=>router.push("/admin/category/create")}>
            Create Category
          </Button>
        </div>

        <TextField fullWidth label="Search" size="small" className="mb-3" />

        

      </div>
    </section>
  )
}

export default AdminCategoriesPage
