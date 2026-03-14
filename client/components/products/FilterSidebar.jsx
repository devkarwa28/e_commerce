"use client";
import filterBarStyles from './products.module.css'
import {Box, Typography, TextField, InputAdornment,Slider, Select, MenuItem, FormControl, Accordion,
AccordionSummary, AccordionDetails, Switch,Button, Divider, IconButton, Paper} from "@mui/material";
import {Search, ExpandMore, FilterList, Close,TuneRounded, RestartAlt} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

const BROWN = "#5c4033";
const GOLD = "#C89B3C";
const BG = "#F8F5F1";
const SURFACE = "#f5ede7";

const sectionLabelSx = {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#3d2b1f",
};

const accordionSx = {
    boxShadow: "none",
    borderBottom: "1px solid #f0ebe4",
    "&:before": { display: "none" },
    "&.Mui-expanded": { margin: 0 },
};

const accordionSummarySx = {
    px: 2.5,
    minHeight: "48px !important",
    "& .MuiAccordionSummary-content": { my: "12px !important" },
    "&:hover": { background: "#faf8f5" },
    transition: "background 180ms ease",
};

const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        background: BG,
        fontSize: "13px",
        "& fieldset": { borderColor: "#ede8e2", borderWidth: "1.5px" },
        "&:hover fieldset": { borderColor: BROWN },
        "&.Mui-focused fieldset": { borderColor: BROWN, borderWidth: "1.5px" },
    },
};

const FilterSidebar = ({ filters, setFilters }) => {
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([filters.minPrice || 0,filters.maxPrice || 5000,]);

    const activeCount = [
        filters.category,
        filters.minPrice,
        filters.maxPrice,
        filters.featured === "true",
        filters.sort,
        filters.search,
        filters.inStock,
    ].filter(Boolean).length;

    useEffect(() => {axios.get("http://localhost:5000/api/category")
        
            .then((res) => setCategories(res.data))

            .catch((err) => console.log(err));
    }, []);

    const handlePriceChange = (_, newValue) => {
        setPriceRange(newValue);
    };

    const handlePriceCommit = (_, newValue) => {
        setFilters({ ...filters, minPrice: newValue[0], maxPrice: newValue[1] });
    };

    const clearFilters = () => {
        setFilters({ category: "", minPrice: "", maxPrice: "", featured: "", sort: "", search: "", inStock: "" });
        setPriceRange([0, 5000]);
    };

    return (
        <Paper elevation={0} sx={{borderRadius: "20px",border: "1px solid #ede8e2",overflow: "hidden",
                background: "#fff",
            }}
        >
            
            <Box
                sx={{
                    px: 2.5,
                    py: 2,
                    borderBottom: "1px solid #f0ebe4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TuneRounded sx={{ color: BROWN, fontSize: 18 }} />
                    <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a" }}>
                        Filters
                    </Typography>
                    {activeCount > 0 && (
                        <Box
                            sx={{
                                background: BROWN,
                                color: "#fff",
                                fontSize: "10px",
                                fontWeight: 700,
                                px: "7px",
                                py: "2px",
                                borderRadius: "50px",
                                lineHeight: 1.6,
                            }}
                        >
                            {activeCount}
                        </Box>
                    )}
                </Box>

                {activeCount > 0 && (
                    <Button
                        size="small"
                        startIcon={<RestartAlt sx={{ fontSize: "14px !important" }} />}
                        onClick={clearFilters}
                        className={filterBarStyles.clearAllBtn}
                    >
                        Clear All
                    </Button>
                )}
            </Box>


            <Accordion defaultExpanded disableGutters sx={accordionSx}>

                <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18, color: "#999" }} />} sx={accordionSummarySx}>
                    <Typography sx={sectionLabelSx}>Search</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search products..."
                        value={filters.search || ""}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        sx={inputSx}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ fontSize: 16, color: "#bbb" }} />
                                </InputAdornment>
                            ),
                            endAdornment: filters.search ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={() => setFilters({ ...filters, search: "" })}
                                        sx={{ color: "#bbb", "&:hover": { color: BROWN } }}
                                    >
                                        <Close sx={{ fontSize: 14 }} />
                                    </IconButton>
                                </InputAdornment>
                            ) : null,
                        }}
                    />
                </AccordionDetails>
            </Accordion>


            <Accordion defaultExpanded disableGutters sx={accordionSx}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18, color: "#999" }} />} sx={accordionSummarySx}>
                    <Typography sx={sectionLabelSx}>Category</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2, display: "flex", flexDirection: "column", gap: "6px" }}>


                    <Box
                        onClick={() => setFilters({ ...filters, category: "" })}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 1.5,
                            py: 1,
                            borderRadius: "12px",
                            cursor: "pointer",
                            border: "1.5px solid",
                            borderColor: !filters.category ? BROWN : "transparent",
                            background: !filters.category ? BROWN : "transparent",
                            transition: "all 200ms ease",
                            "&:hover": { background: !filters.category ? BROWN : SURFACE, borderColor: !filters.category ? BROWN : "#e8d5c9" },
                        }}
                    >
                        <Typography sx={{ fontSize: "13px", fontWeight: 500, color: !filters.category ? "#fff" : "#333" }}>
                            All Categories
                        </Typography>
                    </Box>

                    {categories.map((cat) => (
                        <Box
                            key={cat._id}
                            onClick={() => setFilters({ ...filters, category: cat._id })}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                px: 1.5,
                                py: 1,
                                borderRadius: "12px",
                                cursor: "pointer",
                                border: "1.5px solid",
                                borderColor: filters.category === cat._id ? BROWN : "transparent",
                                background: filters.category === cat._id ? BROWN : "transparent",
                                transition: "all 200ms ease",
                                "&:hover": {
                                    background: filters.category === cat._id ? BROWN : SURFACE,
                                    borderColor: filters.category === cat._id ? BROWN : "#e8d5c9",
                                },
                            }}
                        >
                            <Typography sx={{ fontSize: "13px", fontWeight: 500, color: filters.category === cat._id ? "#fff" : "#333" }}>
                                {cat.cname}
                            </Typography>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>


            <Accordion defaultExpanded disableGutters sx={accordionSx}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18, color: "#999" }} />} sx={accordionSummarySx}>
                    <Typography sx={sectionLabelSx}>Price Range</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2 }}>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mb: 2 }}>
                        <Box>
                            <Typography sx={{ fontSize: "11px", color: "#bbb", mb: 0.5, fontWeight: 600 }}>Min (₹)</Typography>
                            <TextField
                                size="small"
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setPriceRange([val, priceRange[1]]);
                                }}
                                onBlur={() => setFilters({ ...filters, minPrice: priceRange[0] })}
                                sx={inputSx}
                                inputProps={{ min: 0, max: 5000 }}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "11px", color: "#bbb", mb: 0.5, fontWeight: 600 }}>Max (₹)</Typography>
                            <TextField
                                size="small"
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setPriceRange([priceRange[0], val]);
                                }}
                                onBlur={() => setFilters({ ...filters, maxPrice: priceRange[1] })}
                                sx={inputSx}
                                inputProps={{ min: 0, max: 5000 }}
                            />
                        </Box>
                    </Box>


                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        onChangeCommitted={handlePriceCommit}
                        min={0}
                        max={5000}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(v) => `₹${v}`}
                        sx={{
                            color: BROWN,
                            "& .MuiSlider-thumb": {
                                width: 18,
                                height: 18,
                                border: "3px solid #fff",
                                boxShadow: "0 2px 8px rgba(92,64,51,.35)",
                                "&:hover, &.Mui-focusVisible": { boxShadow: `0 0 0 8px rgba(92,64,51,.15)` },
                            },
                            "& .MuiSlider-rail": { background: "#ede8e2", opacity: 1 },
                            "& .MuiSlider-valueLabel": {
                                background: BROWN,
                                borderRadius: "8px",
                                fontSize: "11px",
                            },
                        }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                        <Typography sx={{ fontSize: "11px", color: "#bbb" }}>₹0</Typography>
                        <Typography sx={{ fontSize: "11px", color: "#bbb" }}>₹5,000</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>


            <Accordion defaultExpanded disableGutters sx={accordionSx}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18, color: "#999" }} />} sx={accordionSummarySx}>
                    <Typography sx={sectionLabelSx}>Sort By</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2 }}>
                    <FormControl fullWidth size="small">
                        <Select
                            value={filters.sort || ""}
                            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                            displayEmpty
                            sx={{
                                borderRadius: "12px",
                                background: BG,
                                fontSize: "13px",
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ede8e2", borderWidth: "1.5px" },
                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: BROWN },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: BROWN, borderWidth: "1.5px" },
                            }}
                        >
                            <MenuItem value="" sx={{ fontSize: "13px" }}>Newest First</MenuItem>
                            <MenuItem value="price_low" sx={{ fontSize: "13px" }}>Price: Low to High</MenuItem>
                            <MenuItem value="price_high" sx={{ fontSize: "13px" }}>Price: High to Low</MenuItem>
                            <MenuItem value="rating" sx={{ fontSize: "13px" }}>Top Rated</MenuItem>
                            <MenuItem value="popular" sx={{ fontSize: "13px" }}>Most Popular</MenuItem>
                        </Select>
                    </FormControl>
                </AccordionDetails>
            </Accordion>


            <Accordion defaultExpanded disableGutters sx={{ ...accordionSx, borderBottom: "none" }}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 18, color: "#999" }} />} sx={accordionSummarySx}>
                    <Typography sx={sectionLabelSx}>Availability</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>

                
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.5 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "#333" }}>
                            Featured Only
                        </Typography>
                        <Switch
                            checked={filters.featured === "true"}
                            onChange={(e) => setFilters({ ...filters, featured: e.target.checked ? "true" : "" })}
                            size="small"
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": { color: BROWN },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { background: BROWN },
                            }}
                        />
                    </Box>

                    <Divider sx={{ borderColor: "#f5f0ea" }} />

                    
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.5 }}>
                        <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "#333" }}>
                            In Stock Only
                        </Typography>
                        <Switch
                            checked={filters.inStock === "true"}
                            onChange={(e) => setFilters({ ...filters, inStock: e.target.checked ? "true" : "" })}
                            size="small"
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": { color: BROWN },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { background: BROWN },
                            }}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>

            
            <Box sx={{ px: 2.5, py: 2.5 }}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<FilterList />}
                    sx={{
                        background: BROWN,
                        borderRadius: "14px",
                        py: 1.4,
                        fontSize: "14px",
                        fontWeight: 700,
                        letterSpacing: "0.3px",
                        textTransform: "none",
                        boxShadow: "none",
                        "&:hover": {
                            background: "#4a3328",
                            boxShadow: "0 6px 18px rgba(92,64,51,.30)",
                            transform: "translateY(-1px)",
                        },
                        transition: "all 220ms ease",
                    }}
                >
                    Apply Filters
                </Button>
            </Box>

        </Paper>
    );
};

export default FilterSidebar;
