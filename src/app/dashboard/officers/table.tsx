/** @format */

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Column, useTable, useSortBy, useGlobalFilter } from "react-table";
import { columns as impericalColumn } from "./tableColumns";
import Head from "next/head";
import GlobalFilter from "./globalFilter";
import * as xlsx from "xlsx";
import styles from "./table.module.css";

export default function OfficerTable({ openModal }: any) {
    const [data, setData] = useState([]);

    function deleteOfficer(badgeNumber: number) {
        const config = {
            url: `http://localhost:8080/api/v1/officer/${badgeNumber}`,
            method: "DELETE",
        };
        axios
            .request(config)
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        const config = {
            url: "http://localhost:8080/api/v1/officer/all",
            method: "GET",
        };
        axios
            .request(config)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    const tableColumns = useMemo(() => {
        return impericalColumn;
    }, []);

    const tableData: any = useMemo(() => {
        return data.map((officer: any) => {
            const dutyOn = new Date(
                `2023-01-01T${officer.dutyOn}`
            ).toLocaleTimeString("en-US", {
                hour12: true,
                hour: "numeric",
                minute: "numeric",
            });
            const dutyOut = new Date(
                `2023-01-01T${officer.dutyOut}`
            ).toLocaleTimeString("en-US", {
                hour12: true,
                hour: "numeric",
                minute: "numeric",
            });

            return {
                badgeNumber: officer.badgeNumber,
                firstName: officer.firstName,
                lastName: officer.lastName,
                middleName: officer.middleName,
                dutyOn: dutyOn,
                dutyOut: dutyOut,
                ranks: officer.ranks,
            };
        });
    }, [data]);

    function exportOfficerRecords(row: any) {
        const badgeNumber = row.badgeNumber;
        console.log(badgeNumber);

        const config = {
            url: `http://localhost:8080/api/v1/record/${badgeNumber}`,
            method: "GET",
        };
        axios
            .request(config)
            .then((res) => {
                const datas = res.data.map((record: any) => {
                    return {
                        "Badge Number": record.officer.badgeNumber,
                        "First Name": record.officer.firstName,
                        "Last Name": record.officer.lastName,
                        "Middle Name": record.officer.middleName,
                        "Time In": record.timeIn,
                        "Time Out": record.timeOut,
                        Date: record.date,
                        "Duty On": record.officer.dutyOn,
                        "Duty Out": record.officer.dutyOut,
                        Ranks: record.officer.ranks,
                        late: record.late,
                        Undertime: record.undertime,
                        Overtime: record.overtime,
                        "Admin Name": `${record.admin.lastName}, ${record.admin.firstName}`,
                    };
                });
                const workbook = xlsx.utils.book_new();
                const sheet = xlsx.utils.json_to_sheet(datas);
                xlsx.utils.book_append_sheet(
                    workbook,
                    sheet,
                    `Records of ${row.firstName} ${row.lastName}`
                );
                xlsx.writeFile(
                    workbook,
                    `${row.firstName} ${row.lastName} Record.xlsx`
                );
            })
            .catch((err) => console.log(err));
    }

    const tableHooks = (hooks: any) => {
        hooks.visibleColumns.push((col: any) => {
            return [
                ...col,
                {
                    id: "actions",
                    Header: "Actions",
                    Cell: ({ row }: any) => {
                        return (
                            <Row>
                                <Col>
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            exportOfficerRecords(row.original)
                                        }
                                        variant="dark text-light"
                                    >
                                        Get Record
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        size="sm"
                                        onClick={() => openModal(row.original)}
                                        variant="dark text-light"
                                    >
                                        Update
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            deleteOfficer(
                                                row.original.badgeNumber
                                            )
                                        }
                                        variant="dark text-light"
                                    >
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        );
                    },
                },
            ];
        });
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
    } = useTable(
        { columns: tableColumns, data: tableData },
        useGlobalFilter,
        tableHooks,
        useSortBy
    );

    return (
        <>
            <Row>
                <Col md={10}>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        setGlobalFilter={setGlobalFilter}
                        globalFilter={state.globalFilter}
                    />
                </Col>
                <Col>
                    <Button size="lg" onClick={() => openModal(null)}>
                        New Officer
                    </Button>
                </Col>
            </Row>

            <div className={`${styles.tableFixHead}`}>
                <Table striped bordered hover {...getTableProps}>
                    <thead style={{ zIndex: 100 }}>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((col) => (
                                    <th
                                        className="text-center"
                                        {...col.getHeaderProps(
                                            col.getSortByToggleProps()
                                        )}
                                    >
                                        {col.render("Header")}
                                        {col.isSorted
                                            ? col.isSortedDesc
                                                ? " ▼"
                                                : " ▲"
                                            : ""}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                className="text-left"
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
