"use client";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import revenueCharStyles from './admin.module.css'

const RevenueChart = ({ data }) => {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedData = data.map(item => ({
        month: months[item._id - 1],
        revenue: item.total,
    }));


    return (
        <div className={revenueCharStyles.adminCard}>
            <h6 className='mb-3'>Yearly Revenue Chart</h6>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={formattedData}>
                    <XAxis dataKey="month" tick={{ fill: "#888" }} />
                    <YAxis tick={{ fill: "#888" }} />
                    <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 5px 15px rgba(0,0,0,0.15)" }} formatter={(value) => `₹${value}`} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5c4033" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#5c4033" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#5c4033"
                        fill="url(#colorRevenue)"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                        animationDuration={1200}
                    />
                    <Line type="monotone" dataKey="revenue" stroke='#5c4033' strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 9 }} animationDuration={1200} animationEasing="ease-in-out" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default RevenueChart