'use client'
import Link from "next/link";
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) router.push('/tracker')
    else {
      const data = await res.json()
      setError(data.error)
    }
  }

  return (

    <div className="auth-page">
      <div className="auth-box">
        <h2>LOG IN AND START TRACKING!</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" onChange={handleChange} placeholder="Enter your email" className="auth-input" required />
          <input type="password" onChange={handleChange} placeholder="Enter your password" className="auth-input" required />
          <button type="submit" className="auth-button">
            <Link href="/tracker">Login</Link>
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
        </form>
        <button className="auth-alt-button">
            <Link href="/signup">Sign up</Link>
          </button>
      </div>
    </div>

    // <form onSubmit={handleSubmit}>
    //   <h2>Login</h2>
    //   <input name="email" onChange={handleChange} placeholder="Email" required />
    //   <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
    //   <button type="submit">Login</button>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    // </form>
  )
}
