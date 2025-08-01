'use client'
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Forms.module.css';

export default function Login() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) router.push('/tracker')
    else {
      
      setError(data.error);
    }
  }

  return (

    <div className={styles.authPage}>
      <div className={styles.authBox}>
        <h2>LOG IN AND START TRACKING!</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" className={styles.authInput} required />
          <input type="password" name="password" onChange={handleChange} placeholder="Enter your password" className={styles.authInput} required />
          <br />
          {error && <p style={{ color: '#ff9cacff', textDecoration: 'underline'}}>{error}</p>}
          <button type="submit" className={styles.authButton}>Login</button>

        </form>
        <Link href="/signup"><button className={styles.authAltButton}>
          Sign up
        </button></Link>
      </div>
    </div>
  )
}
