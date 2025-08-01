import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="inner-cont">
          <h2>Welcome to UniBudget!</h2>
          <Link href="/login"><button>Log in</button></Link>
          <Link href="/signup"><button>Sign up</button></Link>
        </div>
      </div>
    </>
  );
}
