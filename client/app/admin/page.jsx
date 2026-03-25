"use client";
import StatCard from '@/components/admin/StatCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

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
        axios.get("http://localhost:5000/api/admin/dashboard", { withCredentials: true }),
        axios.get("http://localhost:5000/api/admin/monthly-sales",{withCredentials:true}),
        axios.get("http://localhost:5000/api/admin/top-products",{withCredentials: true}),
        axios.get("http://localhost:5000/api/admin/order-status",{withCredentials:true}),
        axios.get("http://localhost:5000/api/admin/get-daily-sales",{withCredentials:true}),
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
        <div className='col-lg-4'>
          <OrderStatusChart data={orderStatus} />
        </div>
      </div>
    </div>
  )
}

export default AdminPage