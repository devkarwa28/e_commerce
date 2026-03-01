"use client";
import { Button } from '@mui/material';
import parallaxStyles from './home.module.css'

const ParallaxCollection = () => {
  return (
    <section className={`${parallaxStyles.paraSection} d-flex align-items-center text-center text-light`}>
        <div className="container position-relative" style={{zIndex:"2"}}>
            <h1 className='fw-bold'>Discover Our Premium Collection</h1>
            <div className={parallaxStyles.line}></div>
            <div className='d-flex justify-content-center gap-3 flex-wrap'>
                <Button variant='outlined' className={parallaxStyles.paraBtn}>
                    Jumbo Nuts
                </Button>
                <Button variant='outlined' className={parallaxStyles.paraBtn} >
                    Dates
                </Button>
                <Button variant='outlined' className={parallaxStyles.paraBtn} >
                    Combos
                </Button>
                
            </div>
        </div>
    </section>
  )
}

export default ParallaxCollection