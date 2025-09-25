import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function CreatePost(){
  const [title, setTitle] = useState(''); const [description, setDescription] = useState('')
  const [file, setFile] = useState<File|null>(null)
  const [status, setStatus] = useState<'draft'|'public'>('draft')
  const [msg, setMsg] = useState('')

  async function onSubmit(e: React.FormEvent){
    e.preventDefault(); setMsg('')
    const { data: { user } } = await supabase.auth.getUser()
    if(!user){ setMsg('Please sign in'); return }

    let cover_url: string | null = null
    if(file){
      const path = `${user.id}/${crypto.randomUUID()}-${file.name}`
      const up = await supabase.storage.from('post-images').upload(path, file)
      if(up.error){ setMsg(up.error.message); return }
      const signed = await supabase.storage.from('post-images').createSignedUrl(path, 600)
      if(!signed.error && signed.data) cover_url = signed.data.signedUrl
    }

    const { error } = await supabase.from('posts').insert({
      title, description, cover_url,
      status, published_at: status==='public' ? new Date().toISOString() : null,
      creator_id: user.id
    })
    setMsg(error ? error.message : 'Created!')
    if(!error){ setTitle(''); setDescription(''); setFile(null); setStatus('draft') }
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{display:'grid', gap:10, maxWidth:560, margin:'16px auto'}}>
      <h2>Upload Work</h2>
      <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="textarea" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <select className="select" value={status} onChange={e=>setStatus(e.target.value as any)}>
        <option value="draft">Draft (only you)</option>
        <option value="public">Public</option>
      </select>
      <button className="btn">Save</button>
      <p>{msg}</p>
    </form>
  )
}
