"use client";
import topProductStyles from './admin.module.css'


const TopProducts = ({products}) => {
  return (
    <div className={topProductStyles.adminCard} >
        <h5>Top Selling Products</h5>
        {
            products.map(product => (
                <div key={product._id} className='d-flex justify-content-between py-2 border-bottom'>
                    <span>{product.pname}</span>
                    <span>{product.totalSold}</span>
                </div>
            ))
        }
    </div>
  )
}

export default TopProducts