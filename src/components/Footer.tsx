export default function Footer(){
  return (
    <footer className="section" style={{borderTop:'1px solid #eee', marginTop:24}}>
      <div className="container grid" style={{gap:24}}>
        <div>
          <div style={{fontWeight:900, color:'var(--brand)', marginBottom:6}}>K-Merge</div>
          <p style={{color:'var(--muted)'}}>The premium platform for showcasing and discovering student portfolios at KMUTT University.</p>
        </div>
        <div>
          <strong>Quick Links</strong>
          <ul>
            <li><a href="#">Browse Works</a></li>
            <li><a href="#">Upload Portfolio</a></li>
            <li><a href="#">Success Stories</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
    