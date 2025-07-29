import Link from "next/link";

export default function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>SIGN UP!</h2>
        <input type="text" placeholder="Enter your name" required className="auth-input" />
        <input type="email" placeholder="Enter your email" required className="auth-input" />
        <input type="password" placeholder="Enter your password" className="auth-input" />
        <input type="password" placeholder="Re-enter your password" className="auth-input" />
        <button className="auth-button"><Link href="/">Sign up</Link></button>
        <span>Have an account? <Link href="/" style={{color:'#43b58c', textDecoration: 'underline'}}>Log in</Link></span>
      </div>
        
    </div>
  );
}