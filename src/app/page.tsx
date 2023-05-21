/** @format */

"use client";
import styles from "./page.module.css";
import { Form, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const admin = sessionStorage.getItem("admin");
        const adminObj = JSON.parse(admin!);

        const config = {
            url: "http://localhost:8080/api/v1/admin/login",
            method: "GET",
            params: {
                email: adminObj.email,
                password: adminObj.password,
            },
        };

        axios
            .request(config)
            .then((res) => {
                if (res.data.data) {
                    router.push("/dashboard/officers");
                }
            })
            .catch((err) => {
                console.error(err);
                sessionStorage.removeItem("admin");
            });
    }, []);

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Log In");

        const config = {
            url: "http://localhost:8080/api/v1/admin/login",
            method: "GET",
            params: {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            },
        };

        axios
            .request(config)
            .then((res) => {
                if (res.data.data) {
                    sessionStorage.setItem(
                        "admin",
                        JSON.stringify(res.data.data)
                    );
                    router.push("/dashboard/officers");
                } else {
                    setError("Invalid email or password");
                }
            })
            .catch((err) => console.error(err));
    }

    return (
        <>
            <main className={`${styles.main}`}>
                <Form
                    onSubmit={handleLogin}
                    className="p-4 border border-1 border-secondary rounded"
                >
                    <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            ref={emailRef}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            ref={passwordRef}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Form.Text className="text-danger">{error!}</Form.Text>
                        <Button type="submit">Login</Button>
                    </Form.Group>
                </Form>
            </main>
        </>
    );
}
