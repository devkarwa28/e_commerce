"use client";
import StatCard from '@/components/admin/StatCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

const RevenueChart = dynamic(() => import('@/components/admin/RevenueChart'),{loading : () => <p>Loading.</p>});
const TopProducts = dynamic(()=>import('@/components/admin/TopProducts'),{loading : ()=> <p>Loading</p>});
const DailySalesChart = dynamic(()=>import('@/components/admin/DailySalesChart'),{loading : ()=> <p>Loading</p> });
const OrderStatusChart = dynamic(()=>import('@/components/admin/OrderStatusChart'),{loading : ()=> <p>Loading</p> });

const AdminPage = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0
  });
  const [sales,setSales] = useState([]);
  const [topProducts,setTopProducts] = useState([]);
  const [dailySales,setDailySales] = useState([]);
  const [orderStatus,setOrderStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchStats = async () => {
    try { 
      const [statsRes,salesRes,topRes,orderRes,dailyRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, { withCredentials: true }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/monthly-sales`,{withCredentials:true}),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/top-products`,{withCredentials: true}),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/order-status`,{withCredentials:true}),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-daily-sales`,{withCredentials:true}),
      ]);
      setStats(statsRes.data);
      setSales(salesRes.data);
      setTopProducts(topRes.data);
      setDailySales(dailyRes.data);
      setOrderStatus(orderRes.data)
    }
    catch (err) {
      console.log(err)
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchStats();
  }, [])
  
  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "var(--color-primary, #5c4033)", margin: "0 0 8px 0", letterSpacing: "-1px" }}>Dashboard Overview</h2>
        <p style={{ fontSize: "16px", color: "var(--color-text-secondary, #666)", margin: 0, fontWeight: 500 }}>Welcome back! Here's what's happening with your store today.</p>
      </div>

      <div className='row g-4 mb-5'>

        <div className="col-lg-3">
          <StatCard 
            title="Total Revenue" 
            value={`₹${stats.totalRevenue?.toLocaleString() || 0}`} 
            color="#5c4033" 
            icon={<AccountBalanceWalletRoundedIcon sx={{ fontSize: 28 }} />}
          />
        </div>

        <div className="col-lg-3">
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders?.toLocaleString() || 0} 
            color="#c89b3c"
            icon={<LocalMallRoundedIcon sx={{ fontSize: 28 }} />}
          />
        </div>

        <div className="col-lg-3">
          <StatCard 
            title="Total Products" 
            value={stats.totalProducts?.toLocaleString() || 0} 
            color="#6b8e23"
            icon={<Inventory2RoundedIcon sx={{ fontSize: 28 }} />}
          />
        </div>

        <div className="col-lg-3">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers?.toLocaleString() || 0} 
            color="#E45757"
            icon={<PeopleAltRoundedIcon sx={{ fontSize: 28 }} />}
          />
        </div>

      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <RevenueChart data={sales} />
        </div>
        <div className="col-lg-4">
          <TopProducts products={topProducts}/>
        </div>
      </div>
      
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <DailySalesChart data={dailySales} />
        </div>
        <div className='col-lg-4'>
          <OrderStatusChart data={orderStatus} />
        </div>
      </div>
    </div>
  )
}

export default AdminPage