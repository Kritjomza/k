export default function Stats(){
  const items = [
    { num: '1,200+', label: 'Student Works' },
    { num: '500+',   label: 'Active Creators' },
    { num: '50+',    label: 'Award Winners' }
  ]
  return (
    <section className="section">
      <div className="container grid grid-3">
        {items.map((it, i)=>(
          <div className="card fade-in" style={{animationDelay:`${i*80}ms`}} key={i}>
            <div style={{fontSize:28,fontWeight:900,color:'var(--brand)'}}>{it.num}</div>
            <div style={{color:'var(--muted)'}}>{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
