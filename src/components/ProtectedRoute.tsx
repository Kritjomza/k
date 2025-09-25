import { ReactNode } from 'react'
import { useSession } from '../lib/useSession'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: { children: ReactNode }){
  const session = useSession()
  if (session === null) return <div style={{padding:16}}>Loading…</div>
  return session ? <>{children}</> : <Navigate to="/auth" replace />
}
