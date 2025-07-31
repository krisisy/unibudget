import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="inner-cont">
          <h2>Welcome to UniBudget!</h2>
          <button><Link href="/login">Log in</Link></button>
          <button><Link href="/signup">Sign up</Link></button>
        </div>
      </div>
    </>
  );
}
