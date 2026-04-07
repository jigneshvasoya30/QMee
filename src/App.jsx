import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import BackgroundOrbs from './components/BackgroundOrbs'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'

function AnimatedRoutes() {
  const location = useLocation()
  const noNavPages = ['/chat']

  return (
    <>
      {!noNavPages.includes(location.pathname) && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"         element={<Home />} />
          <Route path="/chat"     element={<Chat />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing"  element={<Pricing />} />
          <Route path="/about"    element={<About />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/signup"   element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile"  element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <BackgroundOrbs />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
