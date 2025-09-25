import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useSession } from "../lib/useSession"
import { useState, useEffect, useRef } from "react"
import "../styles/header.css"

export default function Header(){
  const session = useSession()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  async function handleSignOut(){
    await supabase.auth.signOut()
    navigate("/")
  }

  // ปิด dropdown เมื่อคลิกนอกกรอบ
  useEffect(() => {
    function handleClickOutside(e: MouseEvent){
      if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">K-Merge</Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/saved">Saved</Link>
        </nav>

        <div className="nav-actions">
          {!session ? (
            <Link to="/auth" className="btn ghost">Sign In</Link>
          ) : (
            <>
              <Link to="/create" className="btn upload">Upload Work</Link>

              {/* Avatar + Dropdown */}
              <div className="profile-menu" ref={dropdownRef}>
                <button className="avatar-btn" onClick={()=>setOpen(!open)}>
                  {session.user.email?.[0].toUpperCase()}
                </button>
                {open && (
                  <div className="dropdown">
                    <div className="dropdown-header">
                      <div className="avatar-circle">
                        {session.user.email?.[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="name">
                          {session.user.user_metadata?.full_name || "User"}
                        </div>
                        <div className="email">{session.user.email}</div>
                      </div>
                    </div>
                    <Link to={`/profile/${session.user.id}`} className="dropdown-item">
                      View Profile
                    </Link>
                    <button onClick={handleSignOut} className="dropdown-item">
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
