import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Card = { id:string; title:string; description:string|null; cover_url:string|null }

export default function FeaturedGrid(){
  const [rows, setRows] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchRows(){
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('id,title,description,cover_url')
      .eq('status','public')
      .order('published_at', { ascending: false })
      .limit(30)
    if(!error) setRows(data ?? [])
    setLoading(false)
  }
  useEffect(()=>{ fetchRows() }, [])

  return (
    <section className="section">
      <div className="container">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div>
            <h2 style={{margin:'0 0 4px'}}>Featured Student Works</h2>
            <p style={{margin:0,color:'var(--muted)'}}>Explore outstanding projects from KMUTT students</p>
          </div>
          <button className="btn ghost" onClick={fetchRows}>Refresh</button>
        </div>

        {loading ? <p>Loading…</p> : (
          <div className="masonry">
            {rows.map((c,i)=>(
              <article className="pin" style={{animationDelay:`${i*60}ms`}} key={c.id}>
                {c.cover_url && <img src={c.cover_url} alt="" />}
                <div className="content">
                  <h3>{c.title}</h3>
                  {c.description && <p>{c.description}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
