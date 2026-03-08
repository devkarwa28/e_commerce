"use client";

import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const PaymentMethod = () => {
  return (
    <RadioGroup defaultValue="COD">
        <FormControlLabel value="COD" control={<Radio/>} label="Cash On Delivery" />
        <FormControlLabel value="ONLINE" control={<Radio/>} label="Online Payment (Coming Soon"/>
    </RadioGroup>
  )
}

export default PaymentMethod