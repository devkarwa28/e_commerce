"use client";
import headerStyles from "./header.module.css";
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  CloseRounded,
  FavoriteBorderOutlined,
  Logout,
  MenuRounded,
  Person2Outlined,
  Settings,
  ShoppingBag,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

const MainHeader = () => {
  const { user, logOut, loading } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const open = Boolean(anchorEl);

  const categories = [
    "Shop",
    "Jumbo Nuts",
    "Snacking",
    "Dates",
    "Combos",
    "Seeds",
    "Berries",
    "Spices",
    "Wholesale",
    "Blog",
  ];

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

  const toggleMobileMenu = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileMenuOpen(open);
  };

  return (
    <section className={headerStyles.mainHeader}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className={headerStyles.menuToggle} onClick={toggleMobileMenu(true)}>
              <MenuRounded />
            </div>
            <Link href="/" className={headerStyles.logoLink}>
              <h1 className={headerStyles.logo}>Nutrivia</h1>
            </Link>
          </div>

          <div
            className={`${headerStyles.searchWrap} ${searchFocused ? headerStyles.searchFocused : ""
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
            <div className={`${headerStyles.actionBtn} d-lg-none`}>
              <SearchIcon sx={{ fontSize: 24 }} />
            </div>

            <div className={`${headerStyles.actionBtn} d-none d-lg-flex`} onClick={handleOpen}>
              {user ? (
                <Avatar
                  src={user.avatar || ""}
                  alt={user.uname}
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: 13,
                    fontWeight: 700,
                    bgcolor: "var(--color-primary)",
                    color: "#fff",
                    border: "2px solid var(--color-gold)",
                    transition: "all 300ms ease",
                    "&:hover": { transform: "scale(1.08)" },
                  }}
                >
                  {!user.avatar && getInitials(user.uname)}
                </Avatar>
              ) : (
                <Person2Outlined sx={{ fontSize: 22 }} />
              )}
            </div>

            <Link href="/wishlist" className={headerStyles.actionBtn}>
              <Badge
                badgeContent={wishlist?.length || 0}
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
            </Link>

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

      {/* Desktop Profile Menu */}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.5, pb: 0.5 }}>
            <Avatar
              src={user.avatar || ""}
              alt={user.uname}
              sx={{
                width: 38,
                height: 38,
                fontSize: 15,
                fontWeight: 700,
                bgcolor: "var(--color-primary)",
                color: "#fff",
                border: "2px solid var(--color-gold)",
              }}
            >
              {!user.avatar && getInitials(user.uname)}
            </Avatar>
            <Box>
              <Box sx={{ fontWeight: 700, fontSize: 14, color: "#1E1B18", lineHeight: 1.3 }}>
                {user.uname}
              </Box>
              <Box sx={{ fontSize: 12, color: "#999", lineHeight: 1.3 }}>
                {user.email}
              </Box>
            </Box>
          </Box>
        )}
        {user && <Divider sx={{ margin: "4px 12px !important" }} />}
        {user && (
          <MenuItem onClick={() => { handleClose(); router.push("/profile"); }}>
            <Settings sx={{ mr: 1.5, fontSize: 18, color: "var(--color-primary)" }} />
            Profile Settings
          </MenuItem>
        )}
        {user && (
          <MenuItem onClick={() => { handleClose(); router.push("/orders"); }}>
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
          <MenuItem onClick={() => { handleClose(); router.push("/login"); }}>
            <Person2Outlined sx={{ mr: 1.5, fontSize: 18 }} />
            Login
          </MenuItem>
        )}
      </Menu>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu(false)}
        PaperProps={{
          sx: { 
            width: "85%", 
            maxWidth: 360, 
            borderRadius: "0 24px 24px 0",
            background: "#FFFFFF",
            boxShadow: "10px 0 30px rgba(0,0,0,0.08)"
          }
        }}
      >
        <div className={headerStyles.mobileDrawerHeader}>
          <h2 className={headerStyles.logo}>Nutrivia</h2>
          <IconButton onClick={toggleMobileMenu(false)} sx={{ backgroundColor: "rgba(0,0,0,0.03)", transition: "all 300ms", "&:hover": { backgroundColor: "rgba(0,0,0,0.06)", transform: "rotate(90deg)" } }}>
            <CloseRounded />
          </IconButton>
        </div>

        <Box sx={{ py: 2 }}>
          {/* Mobile Search inside Drawer */}
          <Box sx={{ px: 3, mb: 2 }}>
            <div className={headerStyles.searchWrap} style={{ display: 'flex', width: '100%', marginBottom: '10px' }}>
              <SearchIcon className={headerStyles.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                className={headerStyles.searchInput}
              />
            </div>
          </Box>

          <List sx={{ px: 2 }}>
            {categories.map((cat, i) => (
              <ListItem key={cat} disablePadding>
                <ListItemButton 
                  onClick={() => { setMobileMenuOpen(false); router.push("/products"); }}
                  sx={{ 
                    borderRadius: "12px", 
                    mb: 0.5, 
                    transition: "all 200ms",
                    "&:hover": { backgroundColor: "rgba(200, 155, 60, 0.08)" }
                  }}
                >
                  <ListItemText
                    primary={cat}
                    primaryTypographyProps={{ sx: { fontWeight: 600, color: "#5d554d", fontSize: "15px" } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2, mx: 3 }} />

          <List sx={{ px: 2 }}>
            {user ? (
              <>
                {/* Mobile User Info */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1, mb: 2, background: "rgba(92, 64, 51, 0.04)", borderRadius: "16px" }}>
                  <Avatar
                    src={user.avatar || ""}
                    alt={user.uname}
                    sx={{
                      width: 48,
                      height: 48,
                      fontSize: 16,
                      fontWeight: 700,
                      bgcolor: "var(--color-primary)",
                      color: "#fff",
                      border: "2px solid var(--color-gold)",
                    }}
                  >
                    {!user.avatar && getInitials(user.uname)}
                  </Avatar>
                  <Box>
                    <Box sx={{ fontWeight: 800, fontSize: 16, color: "#1E1B18", lineHeight: 1.2 }}>
                      {user.uname}
                    </Box>
                    <Box sx={{ fontSize: 12, color: "#999", lineHeight: 1.4 }}>
                      {user.email}
                    </Box>
                  </Box>
                </Box>
                
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { setMobileMenuOpen(false); router.push("/profile"); }} sx={{ borderRadius: "12px", mb: 0.5 }}>
                    <Settings sx={{ mr: 2, color: "var(--color-primary)" }} />
                    <ListItemText primary="Profile Settings" primaryTypographyProps={{ fontWeight: 600, color: "#1E1B18" }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { setMobileMenuOpen(false); router.push("/wishlist"); }} sx={{ borderRadius: "12px", mb: 0.5 }}>
                    <FavoriteBorderOutlined sx={{ mr: 2, color: "var(--color-primary)" }} />
                    <ListItemText primary="My Wishlist" primaryTypographyProps={{ fontWeight: 600, color: "#1E1B18" }} />
                    <Badge badgeContent={wishlist?.length || 0} sx={{"& .MuiBadge-badge": { backgroundColor: "var(--color-gold)", color: "#1E1B18" }}} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { setMobileMenuOpen(false); router.push("/orders"); }} sx={{ borderRadius: "12px", mb: 0.5 }}>
                    <ShoppingBag sx={{ mr: 2, color: "var(--color-primary)" }} />
                    <ListItemText primary="My Orders" primaryTypographyProps={{ fontWeight: 600, color: "#1E1B18" }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout} sx={{ borderRadius: "12px", mt: 1, backgroundColor: "rgba(229, 57, 53, 0.05)", "&:hover": { backgroundColor: "rgba(229, 57, 53, 0.1)" }}}>
                    <Logout sx={{ mr: 2, color: "#E53935" }} />
                    <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600, color: "#E53935" }} />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => { setMobileMenuOpen(false); router.push("/login"); }}
                  sx={{ 
                    borderRadius: "12px", 
                    background: "linear-gradient(135deg, var(--color-primary), #7a5c4e)",
                    color: "#FFF",
                    "&:hover": { background: "var(--color-primary)" }
                  }}
                >
                  <Person2Outlined sx={{ mr: 2 }} />
                  <ListItemText primary="Login / Sign Up" primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </section>
  );
};

export default MainHeader;