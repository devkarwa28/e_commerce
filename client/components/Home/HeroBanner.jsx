import React from 'react'
import homestyles from './home.module.css'


const HeroBanner = () => {
    const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
    return (
        <section className={homestyles.heroBanner}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className={homestyles.heroContent}>
                            <h5 className='px-3 py-1 mb-2 d-inline-block'>UP TO 40% OFF</h5>
                            <h1>Premium Dry Fruits <br />For Every Occasion</h1>
                            <p>
                                Naturally sourced, freshly packed and delivered
                                with care. Experience the finest quality nuts,
                                berries and seeds.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className='slider'>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner