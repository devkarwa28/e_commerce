"use client";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import orderStatusStyles from './admin.module.css'
import { color } from 'framer-motion';

const OrderStatusChart = ({ data }) => {

    const COLORS = ["#c89b3c", "#6b8e23", "#5c4033", "red"];

    const formattedData = data.map(item => (
        {
            name: item._id,
            value: item.count
        }
    ));

    return (
        <div className={orderStatusStyles.adminCard}>
            <h6>Order Status Distribution</h6>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={formattedData} 
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    activeShape={{ scale: 1.1 }}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1200}
                    animationEasing='ease-out'
                    >
                        {
                            formattedData.map((entry,index)=>(
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                        }
                    </Pie>
                    <Tooltip formatter={(value)=> `${value} Orders`} contentStyle={{
                        borderRadius: "10px",
                        border:"none",
                        boxShadow:"0 8px 20px rgba(0,0,0,0.15)"
                    }} />
                    
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default OrderStatusChart