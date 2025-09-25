export default function Hero(){
  return (
    <section className="hero fade-in">
      <div className="container">
        <h1>K-Merge</h1>
        <p>Discover amazing student portfolios and creative works from KMUTT University. Showcase your talent and explore innovative projects.</p>
        <div className="search">
          <input className="input" placeholder="Search student works, projects, and portfolios..." />
          <button className="btn">Search</button>
        </div>

        <div className="grid grid-3 hero-stats">
          <div className="stat shimmer"><div className="num">1,200+</div><div className="label">Student Works</div></div>
          <div className="stat shimmer"><div className="num">500+</div><div className="label">Active Creators</div></div>
          <div className="stat shimmer"><div className="num">50+</div><div className="label">Award Winners</div></div>
        </div>
      </div>
    </section>
  )
}
