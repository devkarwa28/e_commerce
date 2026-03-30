"use client";
import headerStyles from "./header.module.css";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  FavoriteBorderOutlined,
  Logout,
  Person2Outlined,
  Settings,
  ShoppingBag,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const MainHeader = () => {
  const { user, logOut, loading } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <section className={headerStyles.mainHeader}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <Link href="/" className={headerStyles.logoLink}>
            <h1 className={headerStyles.logo}>Nutrivia</h1>
          </Link>

          <div
            className={`${headerStyles.searchWrap} ${
              searchFocused ? headerStyles.searchFocused : ""
            }`}
          >
            <SearchIcon className={headerStyles.searchIcon} />
            <input
              type="text"
              placeholder="Search for almonds, pistachios, dates..."
              className={headerStyles.searchInput}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          <div className={headerStyles.headerActions}>
            <div className={headerStyles.actionBtn} onClick={handleOpen}>
              <Person2Outlined sx={{ fontSize: 22 }} />
            </div>

            <div className={headerStyles.actionBtn}>
              <Badge
                badgeContent={3}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "var(--color-gold)",
                    color: "#1E1B18",
                    fontSize: 10,
                    fontWeight: 700,
                    minWidth: 18,
                    height: 18,
                  },
                }}
              >
                <FavoriteBorderOutlined sx={{ fontSize: 22 }} />
              </Badge>
            </div>

            <Link href="/cart" className={headerStyles.actionBtn}>
              <Badge
                badgeContent={cart?.items?.length || 0}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "var(--color-gold)",
                    color: "#1E1B18",
                    fontSize: 10,
                    fontWeight: 700,
                    minWidth: 18,
                    height: 18,
                  },
                }}
              >
                <ShoppingCartOutlined sx={{ fontSize: 22 }} />
              </Badge>
            </Link>
          </div>
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: "14px",
            minWidth: 220,
            boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            border: "1px solid rgba(0,0,0,0.06)",
            "& .MuiMenuItem-root": {
              fontSize: 14,
              padding: "10px 18px",
              borderRadius: "8px",
              margin: "2px 6px",
              transition: "all 200ms ease",
              "&:hover": {
                backgroundColor: "rgba(200, 155, 60, 0.08)",
              },
            },
          },
        }}
      >
        {user && (
          <MenuItem disabled sx={{ opacity: "0.7 !important" }}>
            Hello, {user.uname}
          </MenuItem>
        )}

        {user && <Divider sx={{ margin: "4px 12px !important" }} />}

        {user && (
          <MenuItem onClick={() => router.push("/profile")}>
            <Settings sx={{ mr: 1.5, fontSize: 18, color: "var(--color-primary)" }} />
            Profile Settings
          </MenuItem>
        )}

        {user && (
          <MenuItem onClick={() => router.push("/orders")}>
            <ShoppingBag sx={{ mr: 1.5, fontSize: 18, color: "var(--color-primary)" }} />
            My Orders
          </MenuItem>
        )}

        {user && <Divider sx={{ margin: "4px 12px !important" }} />}

        {user && (
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 1.5, fontSize: 18, color: "var(--color-danger)" }} />
            Logout
          </MenuItem>
        )}

        {!user && (
          <MenuItem onClick={() => router.push("/login")}>
            <Person2Outlined sx={{ mr: 1.5, fontSize: 18 }} />
            Login
          </MenuItem>
        )}
      </Menu>
    </section>
  );
};

export default MainHeader;