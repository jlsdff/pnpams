/** @format */

import { useMemo } from "react";
import { Column, useTable } from "react-table";

export default function OfficerTable() {
    const data = useMemo(
        () => [
            {
                badgeNumber: 1,
                firstName: "John",
                lastName: "Doe",
            },
            {
                badgeNumber: 2,
                firstName: "Jane",
                lastName: "Doe",
            },
        ],
        []
    );

    const columns: any = useMemo(
        () => [
            {
                Header: "Badge Number",
                accessor: "badgeNumber",
            },
            {
                Header: "First Name",
                accessor: "firstName",
            },
            {
                Header: "Last Name",
                accessor: "lastName",
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <table {...getTableProps} style={{ border: "solid 1px blue" }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((col) => (
                            <th
                                {...col.getHeaderProps}
                                style={{
                                    borderBottom: "solid 3px red",
                                    background: "aliceblue",
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                            >
                                {col.render("Header")}
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
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: "10px",
                                            border: "solid 1px gray",
                                            background: "papayawhip",
                                        }}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
