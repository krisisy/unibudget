'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../styles/Forms.module.css';

export default function Signup() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const isFormValid = Object.values(form).every((value) => value.trim() !== "");
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault()
    if (isFormValid){
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
    
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authBox}>
        <h2>SIGN UP!</h2>
        <form onSubmit={handleSubmit}>
          <input className={styles.authInput}
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text" 
            placeholder="Enter your name" 
            required />

          <input className={styles.authInput}
            name="email" 
            value={form.email}
            onChange={handleChange}
            type="email" 
            placeholder="Enter your email" 
            required />

          <input className={styles.authInput}
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password" 
            placeholder="Enter your password" 
            required />

          <input className={styles.authInput}
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            type="password" 
            placeholder="Re-enter your password" 
            required />
          <br /><Link href="/login">
          <button className={styles.authButton} type="submit" disabled={!isFormValid}>
            {isFormValid ? 'Sign up' : 'Please fill out all fields'}
          </button></Link>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <span>Have an account? <Link href="/login" style={{color:'#43b58c', textDecoration: 'underline'}}>Log in</Link></span>
        </form>
      </div>
        
    </div>
  );
}