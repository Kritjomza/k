import Hero from "../components/Hero"
import TagChips from "../components/TagChips"
import FeaturedGrid from "../components/FeaturedGrid"
import Footer from "../components/Footer"

export default function HomePage(){
  return (
    <>
      <Hero/>
      <section className="section">
        <div className="container">
          <h3 style={{margin:0, marginBottom:10}}>Filter & Browse</h3>
          <TagChips/>
        </div>
      </section>
      <FeaturedGrid/>
      <Footer/>
    </>
  )
}
