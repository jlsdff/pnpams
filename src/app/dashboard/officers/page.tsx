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
            <OfficerTable/>
        </>
    );
}
