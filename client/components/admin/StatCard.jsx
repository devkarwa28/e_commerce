"use client";
import statCardStyles from './admin.module.css';
import { motion } from "framer-motion";

const StatCard = ({title,value,color}) => {
  return (
    <motion.div className={statCardStyles.statCard} style={{border:`4px solid ${color}`}} whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.2 }}>
        <h6>{title}</h6>
        <h3>{value}</h3>
    </motion.div>
  )
}

export default StatCard