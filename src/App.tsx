import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthPage from "./features/auth/AuthPage"
import CreatePost from "./features/posts/CreatePost"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"

export default function App(){
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost/>
            </ProtectedRoute>
          }
        />
        <Route path="/profile/:id" element={<ProfilePage/>} />
        {/* ถ้าอยากเพิ่มหน้า Browse/Saved ทีหลัง เพิ่ม route ได้ที่นี่ */}
      </Routes>
    </BrowserRouter>
  )
}
