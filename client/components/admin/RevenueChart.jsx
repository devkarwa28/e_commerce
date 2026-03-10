"use client";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import revenueCharStyles from './admin.module.css'

const RevenueChart = ({data}) => {

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const formattedData = data.map(item => ({
    month: months[item._id - 1],
    revenue: item.total,
}));


  return (
    <div className={revenueCharStyles.adminCard}>
        <h6 className='mb-3'>Revenue Overview</h6>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedData}>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip contentStyle={{borderRadius: "10px",border: "none",boxShadow: "0 5px 15px rgba(0,0,0,0.15)"}}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="revenue" stroke='#5c4033' strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart