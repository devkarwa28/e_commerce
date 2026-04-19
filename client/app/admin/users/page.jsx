"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/all`,
          { withCredentials: true }
        );
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "30px", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px", gap: "12px" }}>
        <GroupRoundedIcon sx={{ fontSize: 36, color: "var(--color-primary)" }} />
        <h1 style={{ color: "var(--color-primary)", fontWeight: 700, margin: 0, fontSize: "28px" }}>Users Management</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "#FFF",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          overflow: "hidden",
          border: "1px solid var(--color-border)"
        }}
      >
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
            Loading Users Insight...
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "800px" }}>
              <thead style={{ background: "var(--color-bg-light)" }}>
                <tr>
                  <th style={{ padding: "18px 24px", color: "var(--color-primary)", fontWeight: 600, borderBottom: "2px solid var(--color-border)" }}>Name</th>
                  <th style={{ padding: "18px 24px", color: "var(--color-primary)", fontWeight: 600, borderBottom: "2px solid var(--color-border)" }}>Email</th>
                  <th style={{ padding: "18px 24px", color: "var(--color-primary)", fontWeight: 600, borderBottom: "2px solid var(--color-border)" }}>Phone Number</th>
                  <th style={{ padding: "18px 24px", color: "var(--color-primary)", fontWeight: 600, borderBottom: "2px solid var(--color-border)", textAlign: "center" }}>Orders</th>
                  <th style={{ padding: "18px 24px", color: "var(--color-primary)", fontWeight: 600, borderBottom: "2px solid var(--color-border)" }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr 
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ borderBottom: "1px solid var(--color-border)", transition: "background 0.2s" }}
                    onMouseOver={(e) => e.currentTarget.style.background = "#FAFAFA"}
                    onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "16px 24px", color: "var(--color-text-primary)", fontWeight: 600 }}>
                      {user.uname}
                    </td>
                    <td style={{ padding: "16px 24px", color: "var(--color-text-secondary)", fontSize: "14px" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: "16px 24px", color: "var(--color-text-secondary)", fontSize: "14px" }}>
                      {user.phone ? user.phone : <span style={{ fontStyle: "italic", opacity: 0.7 }}>Not Provided</span>}
                    </td>
                    <td style={{ padding: "16px 24px", textAlign: "center" }}>
                      <span style={{
                        display: "inline-block",
                        background: user.orderCount > 0 ? "rgba(200, 155, 60, 0.15)" : "var(--color-bg-light)",
                        color: user.orderCount > 0 ? "var(--color-gold)" : "var(--color-text-secondary)",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontWeight: 700,
                        fontSize: "13px",
                      }}>
                        {user.orderCount} Orders
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                       <span style={{
                        display: "inline-block",
                        background: user.role === "admin" ? "rgba(92, 64, 51, 0.1)" : "#F0F0F0",
                        color: user.role === "admin" ? "var(--color-primary)" : "var(--color-text-secondary)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontWeight: 600,
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}>
                        {user.role}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                No users found on the platform.
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminUsers;
