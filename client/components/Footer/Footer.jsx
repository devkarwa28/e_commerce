"use client"
import Link from 'next/link'
import footerStyles from './footer.module.css'
import { Facebook, Instagram, Twitter } from '@mui/icons-material'

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
        <div className='container'>
            <div className="row">
                <div className=' col-lg-2 col-md-3 mb-4'>
                    <h3>Nutrivia</h3>
                    <p>Premium quality dry fruits sourced with care and delivered fresh to your home.</p>
                </div>

                <div className='col-lg-2 col-md-3 mb-4'>
                    <h6>Company</h6>
                    <ul className='list-unstyled'>
                        <li><Link href='#'>About Us</Link></li>
                        <li><Link href='#'>Leadership</Link></li>
                        <li><Link href='#'>Certifications</Link></li>
                        <li><Link href='#'>Careers</Link></li>
                        <li><Link href='#'>Awards</Link></li>
                    </ul>
                </div>
                <div className='col-lg-2 col-md-3 mb-4'>
                    <h6>Our Expertise</h6>
                    <ul className='list-unstyled'>
                        <li><Link href='#'>Private Lable</Link></li>
                        <li><Link href='#'>Wholesale</Link></li>
                        <li><Link href='#'>Modern Trade</Link></li>
                        <li><Link href='#'>Export Import</Link></li>
                        <li><Link href='#'>Quality & Safety</Link></li>
                    </ul>
                </div>

                <div className='col-lg-2 col-md-3 mb-4'>
                    <h6>Quick Links</h6>
                    <ul className='list-unstyled'>
                        <li><Link href='#'>Blog</Link></li>
                        <li><Link href='#'>Gifiting</Link></li>
                        <li><Link href='#'>Bulk Order</Link></li>
                        <li><Link href='#'>Franchise</Link></li>
                        <li><Link href='#'>Coupons</Link></li>
                    </ul>
                </div>
                <div className='col-lg-2 col-md-3 mb-4'>
                    <h6>Information</h6>
                    <ul className='list-unstyled'>
                        <li><Link href='#'>Privacy Policy</Link></li>
                        <li><Link href='#'>Return Policy</Link></li>
                        <li><Link href='#'>Shipping Policy</Link></li>
                        <li><Link href='#'>Terms & Conditions</Link></li>
                    </ul>
                </div>
                <div className='col-lg-2 col-md-3 mb-4'>
                    <h6>Customer Service</h6>
                    <ul className='list-unstyled'>
                        <li><Link href='#'>Contact Us</Link></li>
                        <li><Link href='#'>Grivence</Link></li>
                        <li><Link href='#'>Track Order</Link></li>
                        <li><Link href='#'>FAQ</Link></li>
                    </ul>
                </div>
                {/* <div className='col-lg-2 col-md-3 mb-4'>
                    <h6>Our Partners</h6>
                    <ul className='list-unstyled'>
                        <li><Link href='#'>Amazon</Link></li>
                        <li><Link href='#'>Flipkart</Link></li>
                        <li><Link href='#'>JioMart</Link></li>
                        <li><Link href='#'>BlinkIt</Link></li>
                    </ul>
                </div> */}
            </div>
            <div className='d-flex justify-content-end'>
                <div className='d-flex gap-3'>
                    <Facebook/>
                    <Instagram/>
                    <Twitter/>
                </div>
            </div>
            <hr style={{borderColor: "#333", margin: "40px 0"}} />
            <div className='text-center' style={{fontSize:"14px",color:"#777"}}>
                © {new Date().getFullYear()} MyCompany. All Rights Reserved.
            </div>
        </div>
    </footer>
  )
}

export default Footer