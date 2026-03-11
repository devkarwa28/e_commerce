"use client";
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import orderStatusStyles from './admin.module.css'

const OrderStatusChart = ({ data }) => {

    const COLORS = ["#c89b3c", "#6b8e23", "#5c4033", "#8b5e3c"];

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
                    paddingAngle={5}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default OrderStatusChart