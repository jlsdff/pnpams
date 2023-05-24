/** @format */

"use client";

import Navigation from "@/components/navigation/Navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./dashboard.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ThemeProvider, Button } from "react-bootstrap";

type Props = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
    const sidebarLinks = ["/dashboard/officers", "/dashboard/records"];

    const pathname = usePathname();

    return (
        <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
            minBreakpoint="xxs"
        >
            <header className="border-bottom">
                <Navigation />
            </header>
            <div className={`${styles.mainContainer} `}>
                <aside className="p-4 border-end">
                    <Link href="/attendance">
                        <Button variant="primary">Take Attendance</Button>
                    </Link>
                    {sidebarLinks.map((link, index) => {
                        const isActive = pathname === link;
                        return (
                            <div key={index} className={`${styles.links}`}>
                                <Link className="" href={link}>
                                    <Button
                                        className="mb-2 fs-5 fw-normal"
                                        size="lg"
                                        variant="link"
                                        style={{
                                            color: isActive ? "blue" : "gray",
                                        }}
                                    >
                                        {link
                                            .replace("/dashboard/", "")
                                            .replace("/", "")}
                                    </Button>
                                </Link>
                                <br />
                            </div>
                        );
                    })}
                </aside>
                <main className="p-4">{children}</main>
            </div>
        </ThemeProvider>
    );
}
