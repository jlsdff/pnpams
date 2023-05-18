import Navigation from "@/components/navigation/Navigation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard'
}

type Props = {
    children: React.ReactNode
}

export default function dashboard({children}:Props): JSX.Element{
    return (
        <>
        <h1>main dashboard</h1>
        </>
    )
}