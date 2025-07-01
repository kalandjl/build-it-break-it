"use client"
import { useUser } from "@/util/useUser";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

   const { user, isLoading, error } = useUser()    

   return (
        <>
            {
                user ? 
                <>
                    {`Hello, ${user.username}`}
                </>
                :
                <>
                    <Link href="/signup">
                        Sign Up
                    </Link>
                    <Link href="/login">
                        Log In
                    </Link>
                </>
            }
        </>
    )
}
