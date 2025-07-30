import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container">
        <button><Link href="/login">Log in</Link></button>
        <button><Link href="/signup">Sign up</Link></button>
      </div>
    </>
  );
}
