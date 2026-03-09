"use client";
import { Avatar } from '@mui/material';
import topbarStyles from './admin.module.css'
import { useAuth } from '@/context/AuthContext';

const Topbar = () => {
    const {user} = useAuth();
  return (
    <div className={topbarStyles.topbar}>
        <h6>Admin Dashboard</h6>
        <div className={topbarStyles.user}>
        <Avatar sx={{background:"#5c4033"}}>
            {user?.uname?.charAt(0).toUpperCase()}
        </Avatar>
        <span>{user?.uname}</span>
        </div>
    </div>
  )
}

export default Topbar