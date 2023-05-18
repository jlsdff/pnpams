'use client'

import Navigation from "@/components/navigation/Navigation"
import Link from "next/link"
import { usePathname } from "next/navigation";

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({children}:Props){

    const sidebarLinks = [
        "/dashboard",
        "/dashboard/officers",
        "/dashboard/records",
        "/attendance"
    ]

    const pathname = usePathname();
    console.log(pathname)
    return (
        <>
        <Navigation/>
        <aside>
            {
                sidebarLinks.map((link, index) => {
                    const isActive = pathname.startsWith(link);

                    return (
                        <>
                        <Link
                            style={{
                                color: isActive ? "blue" : "white"
                            }}
                            href={link}
                            key={index}
                        >
                            {link.replace("/dashboard/", "").replace("/", '')}
                        </Link>
                        <br />
                        </>
                    )
                })
            }
            
        </aside>
        <main>
            {children}
        </main>
        </>
    )
}