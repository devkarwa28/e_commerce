import React from 'react'
import headerStyles from './header.module.css'
import { TextField, InputAdornment, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FavoriteBorderOutlined, Person2Outlined, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';

const MainHeader = () => {
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
                            <div className='d-flex justify-content-end gap-3'>
                                <Person2Outlined/>
                                <Badge badgeContent={3} color='secondary'>
                                    <FavoriteBorderOutlined/>
                                </Badge>
                                <Badge badgeContent={2} color='secondary'>
                                    <ShoppingCartOutlined/>
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainHeader