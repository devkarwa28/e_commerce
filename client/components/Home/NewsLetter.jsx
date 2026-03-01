"use client";
import { Button, TextField } from '@mui/material';
import newsStyles from './home.module.css';

const NewsLetter = () => {
  return (
    <section className={`${newsStyles.newsletter} py-5`}>
        <div className='container'>
            <h1 className='text-center mb-1 text-light'>Join Our Community</h1>
            <p className='text-center text-light mb-3'>Get exclusive offers, festive discounts and healthy tips delivered to your inbox.</p>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className='d-flex gap-2'>
                        <TextField fullWidth variant='outlined' placeholder='Enter Your Email' size='small' sx={{backgroundColor:"white",borderRadius:"10px"}}/>
                        <Button variant='contained'>
                            Subcribe
                        </Button>
                    </div>
                </div>
                <div className="col-lg-6"></div>
            </div>
        </div>
    </section>
  )
}

export default NewsLetter