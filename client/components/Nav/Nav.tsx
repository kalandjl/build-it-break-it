import Link from "next/link";
import { FC } from "react";

const links = [
    {
        name: "Home", 
        href: "/"
    },
    {
        name: "Sign Up",
        href: "/signup"
    },
    {
        name: "Log In",
        href: "/login"
    }
]

interface Props {

}

const Nav: FC<Props> = (props) => {

    return (
        <nav id="nav-outer" className="flex justify-between text-white bg-stone-800 h-20 px-10 text-lg">
            <div id="links" className="grid grid-flow-col gap-5 h-full">
                {links.map((link, i) => (
                    <div key={i} className="h-full grid place-items-center px-2">
                        <Link href={link.href} className="h-min font-bold font-sans">
                            {link.name}
                        </Link>
                    </div>
                ))}
            </div>
        </nav>
    )
}

export default Nav