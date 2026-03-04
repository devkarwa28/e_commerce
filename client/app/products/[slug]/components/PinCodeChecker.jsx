"use client";

import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const PinCodeChecker = () => {
    const [pincode,setPincode] = useState()
  return (
    <div className="mt-3">
        <TextField
        fullWidth
        placeholder="Enter Pincode to Check Service Availability"
        value={pincode}
        onChange={(e)=> setPincode(e.target.value)}
        sx={{
            "& .MuiOutlinedInput-root":{
                borderRadius:"12px",
                paddingRight:"12px"
            }
        }}
        InputProps={{
            endAdornment:(
                <InputAdornment position="end">
                    <Button sx={{
                        backgroundColor: "#5c4033",
                        color:"#fff",
                        borderRadius:"10px",
                        padding:"8px 18px",
                        textTransform:"none",
                        fontWeight:500,
                    }}>
                        Check Now
                    </Button>
                </InputAdornment>
            )
        }}
        />
    </div>
  )
}

export default PinCodeChecker