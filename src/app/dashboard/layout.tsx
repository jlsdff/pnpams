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
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className={`mb-2 fs-6 fw-normal ${styles.takeAttendanceButton}`}
                        >
                            <img
                                src="/images/attendance.svg"
                                alt=""
                                className="me-1"
                            />
                            <span>Take Attendance</span>
                        </Button>
                    </Link>
                    <Link href={"/dashboard/officers"} className="d-grid gap-2">
                        <Button
                            className="mb-2 fs-6 fw-normal"
                            size="sm"
                            variant="link"
                            style={{
                                color:
                                    pathname === "/dashboard/officers"
                                        ? "blue"
                                        : "gray",
                            }}
                        >
                            <img
                                src="/images/officer.svg"
                                alt=""
                                className="me-1"
                            />
                            <span>Officers</span>
                        </Button>
                    </Link>
                    <Link href={"/dashboard/records"} className="d-grid gap-2">
                        <Button
                            className="mb-2 fs-6 fw-normal"
                            size="sm"
                            variant="link"
                            style={{
                                color:
                                    pathname === "/dashboard/records"
                                        ? "blue"
                                        : "gray",
                            }}
                        >
                            <img
                                src="/images/records.svg"
                                alt=""
                                className="me-1"
                            />
                            <span>Records</span>
                        </Button>
                    </Link>
                </aside>
                <main className="p-4">{children}</main>
            </div>
        </ThemeProvider>
    );
}
