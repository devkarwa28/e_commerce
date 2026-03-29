"use client";

import { Delete, Edit } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import { useRouter } from "next/navigation";

const CategoryTable = ({ categories, onDelete }) => {
    const router = useRouter();
    return (
        <table className="table table-hover align-middle">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Active Products</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    categories.map(cat => (
                        <tr key={cat._id}>
                            <td>{cat.cname}</td>
                            <td>{cat.image && (
                                <img src={cat.image} alt={cat.cname} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }} />
                            )}</td>
                            <td>
                                <Chip
                                    label={cat.activeProducts ?? 0}
                                    size="small"
                                    sx={{
                                        fontWeight: 600,
                                        backgroundColor: cat.activeProducts > 0 ? "#e8f5e9" : "#fce4ec",
                                        color: cat.activeProducts > 0 ? "#2e7d32" : "#c62828",
                                    }}
                                />
                            </td>

                            <td>
                                <Button size="small" variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => router.push(`/admin/category/edit/${cat._id}`)}>
                                    Edit
                                </Button>
                                <Button size="small" variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => onDelete(cat._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CategoryTable;
