/** @format */

"use client";

import { type } from "os";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { isAwaitExpression } from "typescript";
import axios from "axios";
import OfficerTable from "./table";

type Officer = {
    badgeNumber: number;
    firstName: string;
    lastName: string;
    middleName: string;
    dutyOn: Date;
    dutyOut: Date;
    ranks: string;
};

export default function Officer() {
    const [officers, setOfficers] = useState<Officer[]>([]);

    useEffect(() => {
        const config = {
            url: "http://localhost:8080/api/v1/officer/all",
            method: "GET",
        };

        axios
            .request(config)
            .then((res) => {
                setOfficers(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <h1>Officers</h1>
            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={5}>Personal Information</th>
                        <th colSpan={2}>Time of duty</th>
                    </tr>
                    <tr>
                        <th>Badge Number</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>M.I</th>
                        <th>Rank</th>
                        <th>In</th>
                        <th>Out</th>
                    </tr>
                </thead>
                <tbody>
                    {officers.map((officer, index) => {
                        const dutyIn = new Date(`${officer.dutyOn}`);
                        const dutyOut = new Date(officer.dutyOut);
                        return (
                            <tr key={index}>
                                <td>{officer.badgeNumber}</td>
                                <td>{officer.firstName}</td>
                                <td>{officer.lastName}</td>
                                <td>{officer.middleName}</td>
                                <td>{officer.ranks}</td>
                                <td>{"dutyIn"}</td>
                                <td>{"dutyOut"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table> */}
            <OfficerTable/>
        </>
    );
}
