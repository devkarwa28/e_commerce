"use client";

import { Button } from "@mui/material";

const CategoryTable = ({categories,refresh}) => {
  return (
    <table className="table table-hover align-middle">
        <thead>
            <tr>
                <th>Category</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {
                categories.map(cat => (
                    <tr key={cat._id}>
                        <td>{cat.cname}</td>
                        <td>{cat.image && (
                            <img src={cat.image} alt={cat.cname} style={{width:"50px", height:"50px",objectFit:"cover",borderRadius:"8px"}} />
                        )}</td>

                        <td>
                            <Button size="small"  ></Button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
  )
}

export default CategoryTable