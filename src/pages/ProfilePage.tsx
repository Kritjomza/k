import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabase"

type Profile = { id:string; display_name:string|null; avatar_url:string|null; bio:string|null }
type Post = { id:string; title:string; cover_url:string|null; description:string|null }

export default function ProfilePage(){
  const { id } = useParams()
  const [profile, setProfile] = useState<Profile|null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if(!id) return
    ;(async () => {
      const { data: p } = await supabase.from("profiles").select("*").eq("id", id).single()
      setProfile(p)
      const { data: ps } = await supabase.from("posts")
        .select("id,title,cover_url,description")
        .eq("creator_id", id).eq("status","public").order("created_at",{ascending:false})
      setPosts(ps || [])
    })()
  }, [id])

  if(!profile) return <p style={{padding:20}}>Loading profile…</p>

  return (
    <div className="container" style={{padding:"24px 16px"}}>
      <div style={{display:"flex", alignItems:"center", gap:16, marginBottom:24}}>
        <div style={{width:80,height:80,borderRadius:"50%",overflow:"hidden",background:"#eee"}}>
          {profile.avatar_url
            ? <img src={profile.avatar_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            : <i className="ri-user-line" style={{fontSize:48,display:"flex",justifyContent:"center",alignItems:"center"}}></i>}
        </div>
        <div>
          <h2 style={{margin:"0 0 6px"}}>{profile.display_name || "No name"}</h2>
          {profile.bio && <p style={{margin:0,color:"#6b7280"}}>{profile.bio}</p>}
        </div>
      </div>

      <h3>Works</h3>
      <div className="masonry">
        {posts.map(p=>(
          <article className="pin" key={p.id}>
            {p.cover_url && <img src={p.cover_url} alt="" />}
            <div className="content">
              <h4>{p.title}</h4>
              {p.description && <p>{p.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
