"use client";
import Slider from 'react-slick';
import dryfruitStyles from './home.module.css'
const DryFruitSlider = () => {
     const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
   const items = [
    {
      name: "Raisin",
      image: "/dryfruits/almonds.png",
      bg: "#C89B3C",
    },
    {
      name: "Walnut",
      image: "/dryfruits/walnut.png",
      bg: "#8D2E4D",
    },
    {
      name: "Pista",
      image: "/dryfruits/pista.png",
      bg: "#8B2F1F",
    },
    {
      name: "Cashew",
      image: "/dryfruits/cashew.png",
      bg: "#8A6B5C",
    },
    {
      name: "Almond",
      image: "/dryfruits/almonds.png",
      bg: "#7A5C4F",
    },
    {
      name: "Fig",
      image: "/dryfruits/cashew.png",
      bg: "#8A6B5C",
    },
  ];
  return (
    <section className={`${dryfruitStyles.dry} py-5`}>
        <div className='container'>
            <Slider {...settings}>
                {
                    items.map((item,index)=>(
                        <div key={index} className='px-2 py-3'>
                            <div className={dryfruitStyles.dryCard} style={{background:item.bg}}>
                                <div style={{height:"120px"}}>
                                    <img src={item.image} alt={item.name} style={{objectFit:"contain"}} />
                                </div>
                                <h5 className='mt-3'>{item.name}</h5>
                            </div>
                        </div>
                    ))
                }
            </Slider>
        </div>
    </section>
  )
}

export default DryFruitSlider