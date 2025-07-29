import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>LOG IN AND START TRACKING!</h2>
        <input type="email" placeholder="Enter your email" className="auth-input" />
        <input type="password" placeholder="Enter your password" className="auth-input" />
        <button className="auth-button">
          <Link href="/tracker">Login</Link>
        </button>
        
        <button className="auth-alt-button">
          <Link href="/signup">Sign up</Link>
        </button>
        
      </div>
    </div>
  );
}
