/** @format */

"use client";

import Navigation from "@/components/navigation/Navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./dashboard.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ThemeProvider } from "react-bootstrap";

type Props = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
    const sidebarLinks = [
        "/dashboard/officers",
        "/dashboard/records",
        "/attendance",
    ];

    const pathname = usePathname();

    return (
        <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
            minBreakpoint="xxs"
        >
            <Container className={`${styles.container}`} fluid>
                <Row>
                    <Col>
                        <Navigation />
                    </Col>
                </Row> 
                <Row className={`h-100 ${styles.second} min-vh-100`}>
                    <Col className="">
                        <aside className="">
                            {sidebarLinks.map((link, index) => {
                                const isActive = pathname === link;
                                return (
                                    <div key={index}>
                                        <Link
                                            style={{
                                                color: isActive
                                                    ? "blue"
                                                    : "gray",
                                            }}
                                            className="fs-5 fw-normal"
                                            href={link}
                                        >
                                            {link
                                                .replace("/dashboard/", "")
                                                .replace("/", "")}
                                        </Link>
                                        <br />
                                    </div>
                                );
                            })}
                        </aside>
                    </Col>
                    <Col md={10}>
                        <main>{children}</main>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
}
