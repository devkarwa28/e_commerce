"use client";
import filterBarStyles from './products.module.css'
import {
    Box, Typography, TextField, InputAdornment, Slider, Select, MenuItem, FormControl, Accordion,
    AccordionSummary, AccordionDetails, Switch, Button, Divider, IconButton, Paper, Badge
} from "@mui/material";
import { Search, ExpandMore, FilterList, Close, TuneRounded, RestartAlt, CategoryRounded, PaymentsRounded, ImportExportRounded, BoltRounded, InventoryRounded } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BROWN = "#5c4033";
const GOLD = "#C89B3C";
const OLIVE = "#6B8E23";
const BG = "#FDFCFB";
const SURFACE = "#fcf9f6";

const sectionLabelSx = {
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: BROWN,
    display: "flex",
    alignItems: "center",
    gap: 1.5
};

const accordionSx = {
    boxShadow: "none",
    background: "transparent",
    borderBottom: "1px solid rgba(92, 64, 51, 0.06)",
    "&:before": { display: "none" },
    "&.Mui-expanded": { margin: 0 },
};

const accordionSummarySx = {
    px: 3,
    minHeight: "64px !important",
    "& .MuiAccordionSummary-content": { my: "0 !important" },
    "& .MuiAccordionSummary-expandIconWrapper": { color: "#CCC" },
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": { color: GOLD },
    transition: "all 200ms ease",
};

const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "16px",
        background: "#FFF",
        fontSize: "14px",
        height: "45px",
        "& fieldset": { borderColor: "rgba(92, 64, 51, 0.1)", borderWidth: "1.5px" },
        "&:hover fieldset": { borderColor: GOLD },
        "&.Mui-focused fieldset": { borderColor: BROWN, borderWidth: "1.5px" },
    },
};

const FilterSidebar = ({ filters, setFilters }) => {
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 5000]);

    const activeCount = [
        filters.category,
        filters.minPrice,
        filters.maxPrice,
        filters.featured === "true",
        filters.sort,
        filters.search,
        filters.inStock === "true",
    ].filter(Boolean).length;

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category`)
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
        <Paper 
            elevation={0} 
            sx={{
                borderRadius: "32px",
                border: "1px solid rgba(92, 64, 51, 0.08)",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 10px 40px rgba(92, 64, 51, 0.03)",
                position: "sticky",
                top: "100px"
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 3,
                    background: SURFACE,
                    borderBottom: "1px solid rgba(92, 64, 51, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ 
                        width: 36, 
                        height: 36, 
                        borderRadius: "10px", 
                        background: BROWN, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(92, 64, 51, 0.2)"
                    }}>
                        <TuneRounded sx={{ color: "#FFF", fontSize: 20 }} />
                    </Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 900, color: BROWN, letterSpacing: "-0.5px" }}>
                        Sort & Filter
                    </Typography>
                </Box>

                <AnimatePresence>
                    {activeCount > 0 && (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                            <Button
                                size="small"
                                onClick={clearFilters}
                                sx={{
                                    textTransform: "none",
                                    color: GOLD,
                                    fontWeight: 700,
                                    fontSize: "13px",
                                    "&:hover": { background: "rgba(200, 155, 60, 0.08)" }
                                }}
                            >
                                Reset All
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>

            <Accordion defaultExpanded disableGutters sx={accordionSx}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 20 }} />} sx={accordionSummarySx}>
                    <Typography sx={sectionLabelSx}>
                        <Search sx={{ fontSize: 20, color: GOLD }} /> Search
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="What are you looking for?"
                        value={filters.search || ""}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        sx={inputSx}
                        InputProps={{
                            endAdornment: filters.search ? (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => setFilters({ ...filters, search: "" })} sx={{ color: GOLD }}>
                                        <Close sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </InputAdornment>
                            ) : null,
                        }}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded disableGutters sx={accordionSx}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 20 }} />} sx={accordionSummarySx}>
                    <Typography sx={sectionLabelSx}>
                        <CategoryRounded sx={{ fontSize: 20, color: GOLD }} /> Collections
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, display: "flex", flexDirection: "column", gap: "4px" }}>
                    <Box
                        onClick={() => setFilters({ ...filters, category: "" })}
                        sx={{
                            px: 2, py: 1.2, borderRadius: "14px", cursor: "pointer", transition: "all 200ms ease",
                            background: !filters.category ? "rgba(92, 64, 51, 0.05)" : "transparent",
                            color: !filters.category ? BROWN : "#666",
                            fontWeight: !filters.category ? 800 : 500,
                            "&:hover": { background: "rgba(92, 64, 51, 0.03)", color: BROWN }
                        }}
                    >
                        <Typography sx={{ fontSize: "14px" }}>All Products</Typography>
                    </Box>
                    {categories.map((cat) => (
                        <Box
                            key={cat._id}
                            onClick={() => setFilters({ ...filters, category: cat._id })}
                            sx={{
                                px: 2, py: 1.2, borderRadius: "14px", cursor: "pointer", transition: "all 200ms ease",
                                background: filters.category === cat._id ? "rgba(200, 155, 60, 0.08)" : "transparent",
                                color: filters.category === cat._id ? GOLD : "#666",
                                fontWeight: filters.category === cat._id ? 800 : 500,
                                "&:hover": { background: "rgba(200, 155, 60, 0.05)", color: GOLD }
                            }}
                        >
                            <Typography sx={{ fontSize: "14px" }}>{cat.cname}</Typography>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>


            <Accordion defaultExpanded disableGutters sx={accordionSx}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 20 }} />} sx={accordionSummarySx}>
                    <Typography sx={sectionLabelSx}>
                        <PaymentsRounded sx={{ fontSize: 20, color: GOLD }} /> Price Range
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography sx={{ fontSize: "10px", color: "#999", fontWeight: 800, textTransform: "uppercase" }}>Min</Typography>
                            <Typography sx={{ fontSize: "16px", fontWeight: 900, color: BROWN }}>₹{priceRange[0]}</Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography sx={{ fontSize: "10px", color: "#999", fontWeight: 800, textTransform: "uppercase" }}>Max</Typography>
                            <Typography sx={{ fontSize: "16px", fontWeight: 900, color: BROWN }}>₹{priceRange[1]}+</Typography>
                        </Box>
                    </Box>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        onChangeCommitted={handlePriceCommit}
                        min={0}
                        max={5000}
                        sx={{
                            color: GOLD,
                            height: 6,
                            "& .MuiSlider-thumb": {
                                width: 24, height: 24, background: "#FFF", border: `2px solid ${GOLD}`,
                                "&:hover, &.Mui-active": { boxShadow: "0 0 0 8px rgba(200, 155, 60, 0.15)" },
                                "&:after": { width: 8, height: 8, background: GOLD }
                            },
                            "& .MuiSlider-track": { border: "none", borderRadius: 4 },
                            "& .MuiSlider-rail": { opacity: 0.1, color: BROWN, borderRadius: 4 }
                        }}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded disableGutters sx={accordionSx}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 20 }} />} sx={accordionSummarySx}>
                    <Typography sx={sectionLabelSx}>
                        <ImportExportRounded sx={{ fontSize: 20, color: GOLD }} /> Sorted By
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    <FormControl fullWidth>
                        <Select
                            value={filters.sort || ""}
                            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                            displayEmpty
                            sx={{
                                borderRadius: "16px",
                                background: "#FFF",
                                fontSize: "14px",
                                fontWeight: 600,
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(92, 64, 51, 0.1)", borderWidth: "1.5px" },
                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: GOLD },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: BROWN }
                            }}
                        >
                            <MenuItem value="" sx={{ fontWeight: 600 }}>Newest Arrivals</MenuItem>
                            <MenuItem value="price_low" sx={{ fontWeight: 600 }}>Price: Low to High</MenuItem>
                            <MenuItem value="price_high" sx={{ fontWeight: 600 }}>Price: High to Low</MenuItem>
                            <MenuItem value="rating" sx={{ fontWeight: 600 }}>Customer Rating</MenuItem>
                        </Select>
                    </FormControl>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded disableGutters sx={{ ...accordionSx, borderBottom: "none" }}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ fontSize: 20 }} />} sx={accordionSummarySx}>
                    <Typography sx={sectionLabelSx}>
                        <BoltRounded sx={{ fontSize: 20, color: GOLD }} /> Availability
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <BoltRounded sx={{ color: OLIVE, fontSize: 20 }} />
                            <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#444" }}>Featured Gems</Typography>
                        </Box>
                        <Switch
                            checked={filters.featured === "true"}
                            onChange={(e) => setFilters({ ...filters, featured: e.target.checked ? "true" : "" })}
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": { color: OLIVE },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { background: OLIVE }
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <InventoryRounded sx={{ color: BROWN, fontSize: 18 }} />
                            <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#444" }}>In Stock Only</Typography>
                        </Box>
                        <Switch
                            checked={filters.inStock === "true"}
                            onChange={(e) => setFilters({ ...filters, inStock: e.target.checked ? "true" : "" })}
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": { color: BROWN },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { background: BROWN }
                            }}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};

export default FilterSidebar;
