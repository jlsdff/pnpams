/** @format */

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Column, Row, useTable, useSortBy, useGlobalFilter } from "react-table";
import { columns as impericalColumn } from "./tableColumns";
import Head from "next/head";
import GlobalFilter from "./globalFilter";
import styles from "./table.module.css";

export default function OfficerTable() {
    const [data, setData] = useState([]);

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
            return {
                badgeNumber: officer.badgeNumber,
                firstName: officer.firstName,
                lastName: officer.lastName,
                middleName: officer.middleName,
                dutyOn: officer.dutyOn,
                dutyOut: officer.dutyOut,
                ranks: officer.ranks,
            };
        });
    }, [data]);

    const tableHooks = (hooks: any) => {
        hooks.visibleColumns.push((col: any) => {
            return [
                ...col,
                {
                    id: "actions",
                    Header: "Actions",
                    Cell: ({ row }: any) => {
                        return (
                            <Button
                                size="sm"
                                onClick={() =>
                                    alert(
                                        "getting record of " +
                                            row.values.lastName
                                    )
                                }
                            >
                                Get Record
                            </Button>
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
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
            />
            <div className={`${styles.tableFixHead}`}>
                <Table striped bordered hover {...getTableProps}>
                    <thead>
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
                                            <td className="text-left" {...cell.getCellProps()}>
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
