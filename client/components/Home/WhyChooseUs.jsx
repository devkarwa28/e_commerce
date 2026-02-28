"use client";
import whyStyles from './home.module.css'
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const WhyChooseUs = () => {
    const features = [
    {
      icon: <SpaOutlinedIcon style={{ fontSize: 30 }} />,
      title: "100% Natural",
      desc: "Carefully sourced and hygienically packed dry fruits.",
    },
    {
      icon: <VerifiedOutlinedIcon style={{ fontSize: 30 }} />,
      title: "Premium Quality",
      desc: "Handpicked jumbo nuts with superior freshness.",
    },
    {
      icon: <LocalShippingOutlinedIcon style={{ fontSize: 30 }} />,
      title: "Fast Delivery",
      desc: "Quick dispatch and secure delivery across India.",
    },
    {
      icon: <SecurityOutlinedIcon style={{ fontSize: 30 }} />,
      title: "Secure Payment",
      desc: "Safe checkout experience with encrypted transactions.",
    },
  ];

  return (
    <section className={`${whyStyles.why} py-5`} >
        <div className="container">
            <h1 className='text-center mb-5 fw-bolder'>Why Choose Us</h1>
            <div className="row text-center">
                {features.map((feature,index)=>(
                    <div key={index} className='col-md-3 col-sm-6 mb-4'>
                        <div className={whyStyles.icon}>
                            {feature.icon}
                        </div>
                        <h5 className='fw-bold'>{feature.title}</h5>
                        <p>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default WhyChooseUs