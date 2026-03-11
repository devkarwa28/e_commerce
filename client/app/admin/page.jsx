"use client";
import StatCard from '@/components/admin/StatCard';
import dashboardStyles from './adminPanel.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import RevenueChart from '@/components/admin/RevenueChart';
import TopProducts from '@/components/admin/TopProducts';
import DailySalesChart from '@/components/admin/DailySalesChart';
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
  const [loading, setLoading] = useState(true);
  const fetchStats = async () => {
    try {
      const statsRes = await axios.get("http://localhost:5000/api/admin/dashboard", { withCredentials: true });
      const salesRes = await axios.get("http://localhost:5000/api/admin/monthly-sales",{withCredentials:true});
      const topRes = await axios.get("http://localhost:5000/api/admin/top-products",{withCredentials: true})
      const dailyRes = await axios.get("http://localhost:5000/api/admin/get-daily-sales",{withCredentials:true})

      setStats(statsRes.data);
      setSales(salesRes.data);
      setTopProducts(topRes.data);
      setDailySales(dailyRes.data);
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
    <div className="container">
      <h2>Dashboard Overview</h2>

      <div className='row g-4 mb-4'>

        <div className="col-lg-3">
          <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} color="#5c4033" />
        </div>

        <div className="col-lg-3">
          <StatCard title="Orders" value={stats.totalOrders} color="#c89b3c" />
        </div>

        <div className="col-lg-3">
          <StatCard title="Total Products" value={stats.totalProducts} color="#6b8e23" />
        </div>

        <div className="col-lg-3">
          <StatCard title="Total Users" value={stats.totalUsers} color="#8b5e3c" />
        </div>

      </div>

      <div className="row mb-4">

        <div className="col-lg-8">
          <RevenueChart data={sales} />
        </div>

        <div className="col-lg-4">
          <TopProducts products={topProducts}/>
        </div>

      </div>
      <div className="row">

        <div className="col-lg-8">
          <DailySalesChart data={dailySales} />
        </div>

      </div>
    </div>
  )
}

export default AdminPage