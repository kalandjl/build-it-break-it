import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Link href="/signup">
                Sign Up
            </Link>
            <Link href="/login">
                Log In
            </Link>
        </>
    )
}
