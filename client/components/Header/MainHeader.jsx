"use client";
import headerStyles from './header.module.css'
import { TextField, InputAdornment, Badge, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FavoriteBorderOutlined, Logout, Person2Outlined, Settings, ShoppingBag, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const MainHeader = () => {
    const { user, logOut, loading } = useAuth();
    const {cart} = useCart();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = async () => {
        await logOut();
        router.push("/login");
    }
    return (
        <section className={`${headerStyles.mainHeader} py-3 px-4`}>
            <div className="container-fluid">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <h1>MyCompany</h1>
                        </div>
                        <div className="col-lg-6">
                            <TextField
                                fullWidth
                                placeholder="Search for almonds, pista..."
                                size="small"
                                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className="col-lg-3">
                            <div className='d-flex justify-content-end gap-1'>
                                <IconButton onClick={handleOpen}>
                                    <Person2Outlined />
                                </IconButton>
                                <IconButton>
                                    <Badge badgeContent={3} color='secondary'>
                                        <FavoriteBorderOutlined />
                                    </Badge>
                                </IconButton>
                                <Link href="/cart">
                                <IconButton>
                                    <Badge badgeContent={cart?.items?.length || 0} color='secondary'>
                                        <ShoppingCartOutlined />
                                    </Badge>
                                </IconButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{
                sx: { mt: 1, borderRadius: "10px", minWidth: 200, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }
            }} >
                
                {user && (
                    <MenuItem disabled>
                        Hello {user.uname}
                    </MenuItem>
                )}

                {user && <Divider />}

                {user && (
                    <MenuItem onClick={() => router.push("/profile")}>
                        <Settings sx={{ mr: 1 }} />
                        Profile Setting
                    </MenuItem>
                )}

                {user && (
                    <MenuItem onClick={()=> router.push("/orders")}>
                        <ShoppingBag sx={{ mr: 1 }} />
                        My Orders
                    </MenuItem>
                )}

                {user && <Divider />}

                {user && (
                    <MenuItem onClick={handleLogout}>
                        <Logout sx={{ mr: 1 }} />
                        Logout
                    </MenuItem>
                )}

                {!user && (
                    <MenuItem onClick={() => router.push("/login")}>
                        Login
                    </MenuItem>
                )}
            </Menu>
        </section>
    )
}

export default MainHeader