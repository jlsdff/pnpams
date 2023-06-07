/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import {
    Container,
    Table,
    Row,
    Col,
    Button,
    ButtonGroup,
    ToggleButton,
} from "react-bootstrap";
import Filter from "./filter";
import axios from "axios";
import TableRow from "./recordTableRow";
import { Metadata } from "next";
import RecordTable from "./table";
import styles from "./records.module.css";
import NewRecord from "./NewRecord";
import ExportButton from "../../../components/export/ExportToExcel";

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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    function addRecord() {
        setIsModalOpen((prev) => !prev);
    }

    return (
        <>
            {isModalOpen ? (
                <NewRecord />
            ) : (
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Filters</Accordion.Header>
                        <Accordion.Body>
                            <Filter
                                setRecords={setRecords}
                                setTitle={setTitle}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}

            <br />
            <div className={`${styles.container} mb-3`}>
                <div>
                    <h6 className="text-secondary fw-bold">{title}</h6>
                </div>
                <div>
                    <div>
                        <ButtonGroup>
                            {/* <Button size="sm" variant="outline-dark">
                                Export Record
                            </Button> */}
                            <ExportButton
                                data={records}
                                fileName={title}
                                sheetName="Records"
                                buttonName="Export Records"
                            />
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={addRecord}
                            >
                                New Record
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <RecordTable data={records} setData={setRecords} />
        </>
    );
}
