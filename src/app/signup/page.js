'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.confirm) return setError("Passwords don't match")

    const res = await fetch('/api/auth/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) router.push('/login')
    else {
      const data = await res.json()
      setError(data.error)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>SIGN UP!</h2>
        <form onSubmit={handleSubmit}>
          <input className="auth-input"
            name="name"
            onChange={handleChange}
            type="text" 
            placeholder="Enter your name" 
            required />

          <input className="auth-input"
            name="email" 
            onChange={handleChange}
            type="email" 
            placeholder="Enter your email" 
            required />

          <input className="auth-input"
            name="password"
            onChange={handleChange}
            type="password" 
            placeholder="Enter your password" 
            required />

          <input className="auth-input"
            name="confirm"
            onChange={handleChange}
            type="password" 
            placeholder="Re-enter your password" 
            required />
          <br /><Link href="/login">
          <button className="auth-button" type="submit">Sign up</button></Link>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <span>Have an account? <Link href="/login" style={{color:'#43b58c', textDecoration: 'underline'}}>Log in</Link></span>
        </form>
      </div>
        
    </div>
  );
}