export default function ProductsLayout({children}){
    return(
        <section className="productsPage">
            <div className="container">
                {children}
            </div>
        </section>
    )
}