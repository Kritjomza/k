import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import '../../styles/auth.css'

type Mode = 'signup' | 'signin'

export default function AuthPage(){
  const [mode, setMode] = useState<Mode>('signup')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ text:string, type:'success'|'error'}|null>(null)

  async function ensureProfile(userId: string, name?: string, avatarUrl?: string) {
    await supabase.from('profiles').upsert({
      id: userId,
      display_name: name ?? undefined,
      avatar_url: avatarUrl ?? undefined
    })
  }

  async function onSubmit(e: React.FormEvent){
    e.preventDefault(); setMsg(null); setLoading(true)
    try{
      if(mode==='signup'){
        const { data, error } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: displayName } }
        })
        if (error) throw error
        if (data.session?.user) {
          await ensureProfile(data.session.user.id, displayName)
        }
        setMsg({ text:'สมัครสำเร็จ! โปรดยืนยันอีเมลแล้วกลับมาล็อกอิน', type:'success' })
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        if (data.user) {
          await ensureProfile(data.user.id, data.user.user_metadata?.full_name as string | undefined)
        }
        setMsg({ text:'ล็อกอินสำเร็จ!', type:'success' })
      }
    }catch(err:any){
      setMsg({ text: err.message || 'เกิดข้อผิดพลาด', type:'error' })
    }finally{
      setLoading(false)
    }
  }

  async function signInWithGoogle(){
    setMsg(null)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{mode==='signup'?'Create account':'Welcome back'}</h2>
          <p>{mode==='signup'
            ? 'เริ่มต้นสร้างโปรไฟล์และแชร์ผลงานกับเพื่อน ๆ'
            : 'เข้าสู่ระบบเพื่อจัดการและแสดงผลงานของคุณ'}
          </p>
        </div>

        <div className="auth-switch">
          <button className={`btn ${mode==='signup'?'':'ghost'}`} onClick={()=>setMode('signup')}>Sign up</button>
          <button className={`btn ${mode==='signin'?'':'ghost'}`} onClick={()=>setMode('signin')}>Sign in</button>
        </div>

        <button className="auth-google" onClick={signInWithGoogle}>
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.19-5.238C29.205,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.51,5.017C9.488,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.164-4.093,5.565c0.001-0.001,0.002-0.001,0.003-0.002 l6.19,5.238C36.936,39.023,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
          Continue with Google
        </button>

        <form className="auth-form" onSubmit={onSubmit}>
          {mode==='signup' && (
            <div>
              <label>Display name</label>
              <input className="input" placeholder="เช่น Krit, Nan" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
            </div>
          )}
          <div>
            <label>Email</label>
            <input className="input" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <button className="btn" disabled={loading}>
            {loading ? 'Please wait…' : (mode==='signup'?'Create account':'Login')}
          </button>
        </form>

        {msg && <p className={`auth-msg ${msg.type}`}>{msg.text}</p>}
      </div>
    </div>
  )
}
