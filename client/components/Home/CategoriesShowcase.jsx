"use client";
import catStyles from './home.module.css'

const CategoriesShowcase = () => {
    const categories = [
    {
      title: "Jumbo Nuts",
      image: "/cat/jumbonuts.png",
      big: true,
    },
    {
      title: "Snacking",
      image: "/cat/snacking.png",
    },
    {
      title: "Dates",
      image: "/cat/dates.png",
    },
    {
      title: "Seeds",
      image: "/cat/seeds.png",
    },
    {
      title: "Combos",
      image: "/cat/combos.png",
    },
  ];
  return (
    <section className={catStyles.categories}>
        <div className="container">
            <h2 className='text-center mb-5'>Shop By Category</h2>

            <div className="row g-4">
                <div className='col-md-6'>
                    <CategoryCard data={categories[0]} large />
                </div>
                <div className='col-md-6'>
                    <div className="row g-4">
                        {
                            categories.slice(1).map((cat,index)=>(
                                <div key={index} className='col-md-6'>
                                    <CategoryCard data={cat}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
function CategoryCard({data,large})
{
    return(
        <div className={`${catStyles.CatCard} position-relative overflow-hidden`} style={{height : large ? "400px" : "190px"}}>
            <img src={data.image} alt={data.title} className='w-100 h-100 img-fluid' />

            <div className="position-absolute top-0 start-0 w-100 h-100" style={{background:"linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))"}}></div>
            <div className='position-absolute bottom-0 start-0 p-4 text-white fw-bold' style={{fontSize: large ? "24px":"18px"}}>
                {data.title}
            </div>
        </div>
    )
}
export default CategoriesShowcase