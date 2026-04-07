import { useState, useEffect } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Initial check on load
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const signup = (userData) => {
    let users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }

  const login = (email, password) => {
    let users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find(u => u.email === email && u.password === password)
    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser))
      setUser(foundUser)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  return { user, signup, login, logout }
}
