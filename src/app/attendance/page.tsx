/** @format */
import AttendanceMain from "./main";
import { Metadata } from "next";

export const config: Metadata = {
    title: "Attendance",
    description: "Attendance page",
}

export default function Attendance() {
    return (
        <>
            <AttendanceMain />
        </>
    );
}
