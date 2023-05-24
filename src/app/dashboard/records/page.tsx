/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Table } from "react-bootstrap";
import Filter from "./filter";
import axios from "axios";
import TableRow from "./recordTableRow";
import { Metadata } from "next";
import RecordTable from "./table";

type Record = {
    recordId: number;
    officer: Officer;
    admin: Admin;
    timeIn: string;
    timeOut: string;
    date: string;
};
type Officer = {
    badgeNumber: number;
    firstName: string;
    lastName: string;
    middleName: string;
    dutyOn: Date;
    dutyOut: Date;
    ranks: string;
};
type Admin = {
    admin_id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    password: string;
    timestamp: string;
};

export const metadata: Metadata = {
    title: "Records",
    description: "Records of officer's attendance",
};

export default function Records() {
    const [records, setRecords] = useState<Record[]>([]);

    const [month, day, year] = new Date()
        .toLocaleDateString("en-US")
        .split("/");

    const [title, setTitle] = useState<string>(
        "Records for today, " + new Date().toLocaleDateString()
    );

    useEffect(() => {
        console.log(year, month, day);

        const config = {
            url: "http://localhost:8080/api/v1/record",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                year,
                month,
                day,
            },
        };

        const data = axios
            .request(config)
            .then((response) => {
                setRecords(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filters</Accordion.Header>
                    <Accordion.Body>
                        <Filter setRecords={setRecords} setTitle={setTitle} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br />
            <h6 className="text-secondary" >{title}</h6>
            <RecordTable data={records} setData={setRecords} />
        </>
    );
}
