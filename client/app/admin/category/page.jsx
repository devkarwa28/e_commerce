"use client";

import CategoryTable from "@/components/admin/CategoryTable";
import { Button, TextField, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category", { withCredentials: true });
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to disable this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/category/${id}`, { withCredentials: true });
      setCategories(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtered = categories.filter(c =>
    c.cname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container py-4">
      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Categories</h2>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push("/admin/category/create")}
            sx={{
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Create Category
          </Button>
        </div>

        <TextField
          fullWidth
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ mb: 3 }}
        />

        {loading ? (
          <div className="text-center py-5">
            <CircularProgress sx={{ color: "#5C4033" }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No categories found.</p>
          </div>
        ) : (
          <CategoryTable categories={filtered} onDelete={handleDelete} />
        )}
      </div>
    </section>
  );
};

export default AdminCategoriesPage;