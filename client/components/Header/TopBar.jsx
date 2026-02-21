import headerStyles from './header.module.css'

const TopBar = () => {
  return (
    <div className={`${headerStyles.topBar} py-1 px-2`}>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          🚚 Free Shipping on Orders Above ₹1499/-
        </div>
        <div>
          <div className="d-flex gap-4">
            <div>Track Order</div>
            <div>Bulk Order</div>
            <div>Contact</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar