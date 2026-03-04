"use client";

import { FavoriteBorder, FitnessCenter, HealthAndSafety, Spa } from "@mui/icons-material";

const BenifitsIcon = () => {
    const benefits = [
    {
      icon: <FavoriteBorder />,
      title: "Heart Healthy"
    },
    {
      icon: <Spa />,
      title: "Gluten Free"
    },
    {
      icon: <FitnessCenter />,
      title: "Powerful Nutrition"
    },
    {
      icon: <HealthAndSafety />,
      title: "Cholesterol Free"
    }
  ];
  return (
    <div className="d-flex justify-content-between align-items-center py-4 mt-4" style={{borderTop:"1px solid #5c4033", borderBottom:"1px solid #5c4033"}}>
        {
            benefits.map((item,index)=>(
                <div key={index} className="text-center flex-fill" style={{borderRight: index !== benefits.length - 1 ? "1px solid #5c4033" : "none" }}>

                    <div style={{fontSize:"28px",color:"#5c4033",marginBottom:"8px"}}>
                        {item.icon}
                    </div>
                    <p style={{fontSize:"14px",fontWeight:500,margin:0}}>
                        {item.title}
                    </p>
                </div>
            ))
        }
    </div>
  )
}

export default BenifitsIcon