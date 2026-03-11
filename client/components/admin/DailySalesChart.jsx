"use client";
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import chartStyles from './admin.module.css'

const DailySalesChart = ({ data }) => {
    const formattedData = data.map(item => (
        {
            date: String(item._id).slice(5),
            revenue: item.revenue
        }
    ));
    return (
        <div className={chartStyles.adminCard}>
            <h6 className='mb-3'>Last 30 Days Sale</h6>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={formattedData}>
                    <defs>
                        <linearGradient id="dailyRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#c89b3c" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#c89b3c" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey="date" tick={{ fill: "#777", fontSize: 12 }} />

                    <YAxis tick={{ fill: "#777", fontSize: 12 }} />
                    <Tooltip
                        formatter={(value) => `₹${value}`}
                        contentStyle={{
                            borderRadius: "10px",
                            border: "none",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                        }}
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#c89b3c"
                        fill="url(#dailyRevenue)"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 7 }}
                        animationBegin={200}
                        animationDuration={1400}
                    />
                    <Line type="monotone" dataKey="revenue" stroke='#c89b3c' strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 9 }} animationDuration={1200} animationEasing="ease-in-out" />
                </AreaChart>

            </ResponsiveContainer>
        </div>
    )
}

export default DailySalesChart