/** @format */
"use client";
import Link from "next/link";
import styles from "./main.module.css";
import { useRef, useState } from "react";
import axios from "axios";
import LoginForm from "./form";
import AttendanceInfo from "./attendanceInfo";

export default function AttendanceMain() {
    const badgeNumberRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);

    const [data, setData] = useState<any>(null);

    const admin = JSON.parse(sessionStorage.getItem("admin") || "{}");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const date = new Date();
        const dateSQL = date.toLocaleDateString().split("/").join("-");
        const config = {
            url: "http://localhost:8080/api/v1/record",
            method: "POST",
            data: {
                adminId: admin?.admin_id,
                badgeNumber: Number.parseInt(badgeNumberRef.current?.value!),
                time: date.toLocaleTimeString("en-US", {
                    hour12: false,
                }),
            },
        };
        axios
            .request(config)
            .then((res) => {
                console.log(res);
                if (res.data === "") {
                    setData(null);
                    setError("Badge number not found");
                    
                } else {
                    setData(res.data);
                    setTimeout(()=>{
                        setData(null);
                    }, 3000)
                    setError(null);
                }
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 404)
                    setError("Badge number not found");
                else setError("Something went wrong");
            });
    };

    return (
        <>
            <div
                className={`vh-100 d-flex justify-content-center align-items-center ${styles.mainContainer}`}
            >
                {data === null ? (
                    <LoginForm
                        handleSubmit={handleSubmit}
                        badgeNumberRef={badgeNumberRef}
                        error={error}
                    />
                ) : (
                    <AttendanceInfo data={data}/>
                )}
            </div>
        </>
    );
}
