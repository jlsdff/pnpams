/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Table } from "react-bootstrap";
import Filter from "./filter";
import axios from "axios";
import TableRow from "./recordTableRow";
import { Metadata } from "next";

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
    
    useEffect(() => {

        console.log(year, month, day)

        const config = {
            url: "http://localhost:8080/api/v1/record",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                year,
                month,
                day
            }
        }

        const data = axios
            .request(config)
            .then((response) => {
                setRecords(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <h1>Records</h1>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filters</Accordion.Header>
                    <Accordion.Body>
                        <Filter setRecords={setRecords} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br />
            <h6>Records for {new Date().toLocaleDateString()}</h6>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>M.I</th>
                        <th>Date</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {records?.map((record, index) => {
                        return (
                            <TableRow
                                key={record.recordId}
                                id={record.officer.badgeNumber}
                                firstName={record.officer.firstName}
                                lastName={record.officer.lastName}
                                middleName={record.officer.middleName}
                                date={record.date}
                                timeIn={record.timeIn}
                                timeOut={record.timeOut}
                            />
                        );
                    })}
                    {   
                        records.length === 0 && <tr><td colSpan={8} className="text-center">No records found</td></tr>
                    }
                </tbody>
            </Table>
        </>
    );
}
