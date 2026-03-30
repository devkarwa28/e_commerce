import headerStyles from "./header.module.css";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className={headerStyles.topBar}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className={headerStyles.topBarLeft}>
            <LocalShippingOutlinedIcon sx={{ fontSize: 15 }} />
            <span>Free Shipping on Orders Above ₹1499/-</span>
          </div>
          <div className={headerStyles.topBarRight}>
            <Link href="#">Track Order</Link>
            <span className={headerStyles.topBarDot}></span>
            <Link href="#">Bulk Order</Link>
            <span className={headerStyles.topBarDot}></span>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;