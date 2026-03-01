"use client";
import { CardGiftcard, FitnessCenter, Restaurant, Spa } from '@mui/icons-material';
import shopbyStyles from './home.module.css';
const ShopByPurpose = () => {
     const items = [
    {
      title: "Gifting",
      icon: <CardGiftcard fontSize="large" />,
      desc: "Premium gift hampers curated for every celebration.",
      gradient: "linear-gradient(135deg, #7A5142, #5C4033)"
    },
    {
      title: "Cooking",
      icon: <Restaurant fontSize="large" />,
      desc: "High-quality ingredients to enhance every recipe.",
      gradient: "linear-gradient(135deg, #8B6A5C, #6D4C41)"
    },
    {
      title: "Healthy Snacking",
      icon: <Spa fontSize="large" />,
      desc: "Snack smart with nutritious daily essentials.",
      gradient: "linear-gradient(135deg, #7A8B55, #6B8E23)"
    },
    {
      title: "Daily Nutrition",
      icon: <FitnessCenter fontSize="large" />,
      desc: "Boost your routine with powerful superfoods.",
      gradient: "linear-gradient(135deg, #5C4033, #3E2A22)"
    }
  ];

  return (
    <section className={`${shopbyStyles.shopby} py-5`}>
        <div className="container">
            <h1 className='mb-2 text-center'>Shop By Purpose</h1>
            <p className='mb-5 text-center'>Discover products curated around your lifestyle and daily needs.</p>

            <div className="row">
                {
                    items.map((item,index)=>(
                        <div key={index} className='col-lg-3 col-md-6 mb-4'>
                            <div className={`${shopbyStyles.purposeCard} p-4 text-white`} style={{background:item.gradient}} >
                                <div className={shopbyStyles.purposeIcon}>{item.icon}</div>
                                <div style={{marginTop:"50px"}}>
                                    <h5 className='mb-3 fw-bolder'>{item.title}</h5>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default ShopByPurpose