"use client";
import headerStyles from "./header.module.css";
import {
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
              <Person2Outlined sx={{ fontSize: 22 }} />
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
          <MenuItem disabled sx={{ opacity: "0.7 !important" }}>
            Hello, {user.uname}
          </MenuItem>
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
          sx: { width: "85%", maxWidth: 360, borderRadius: "0 24px 24px 0" }
        }}
      >
        <div className={headerStyles.mobileDrawerHeader}>
          <h2 className={headerStyles.logo}>Nutrivia</h2>
          <IconButton onClick={toggleMobileMenu(false)}>
            <CloseRounded />
          </IconButton>
        </div>

        <Box sx={{ py: 2 }}>
          {/* Mobile Search inside Drawer */}
          <Box sx={{ px: 2, mb: 2 }}>
            <div className={headerStyles.searchWrap} style={{ display: 'flex', width: '100%', marginBottom: '10px' }}>
              <SearchIcon className={headerStyles.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                className={headerStyles.searchInput}
              />
            </div>
          </Box>

          <List>
            {categories.map((cat) => (
              <ListItem key={cat} disablePadding>
                <ListItemButton onClick={() => { setMobileMenuOpen(false); router.push("/products"); }}>
                  <ListItemText
                    primary={cat}
                    primaryTypographyProps={{ sx: { fontWeight: 600, color: "#4A4542" } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1, mx: 2 }} />

          <List>
            {user ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { setMobileMenuOpen(false); router.push("/profile"); }}>
                    <Settings sx={{ mr: 2, color: "var(--color-primary)" }} />
                    <ListItemText primary="Profile Settings" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { setMobileMenuOpen(false); router.push("/wishlist"); }}>
                    <FavoriteBorderOutlined sx={{ mr: 2, color: "var(--color-primary)" }} />
                    <ListItemText primary="My Wishlist" />
                    <Badge badgeContent={wishlist?.length || 0} sx={{"& .MuiBadge-badge": { backgroundColor: "var(--color-gold)", color: "#1E1B18" }}} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { setMobileMenuOpen(false); router.push("/orders"); }}>
                    <ShoppingBag sx={{ mr: 2, color: "var(--color-primary)" }} />
                    <ListItemText primary="My Orders" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <Logout sx={{ mr: 2, color: "var(--color-danger)" }} />
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton onClick={() => { setMobileMenuOpen(false); router.push("/login"); }}>
                  <Person2Outlined sx={{ mr: 2 }} />
                  <ListItemText primary="Login / Sign Up" />
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
;