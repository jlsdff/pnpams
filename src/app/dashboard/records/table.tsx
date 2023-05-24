/** @format */

import { Table } from "react-bootstrap";
import { Column, Row, useTable, useSortBy, useGlobalFilter } from "react-table";
import { columns } from "./tableColumns";
import { useMemo } from "react";

type Props = {
    data: any[];
    setData: (data: any) => void;
};

export default function RecordTable({ data, setData }: Props) {
    const tableColumns = useMemo(() => [...columns], [data]);

    const tableData: any = useMemo(() => {
        return data.map((record) => {
            return {
                lastName: record.officer.lastName,
                firstName: record.officer.firstName,
                middleName: record.officer.middleName.charAt(0) + ".",
                badgeNumber: record.officer.badgeNumber,
                timeIn: record.timeIn,
                timeOut: record.timeOut,
                date: record.date,
                status: record.status ? record.status : "",
            };
        });
    }, [data]);

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
        useSortBy
    );

    return (
        <div>
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
                <tbody {...getTableBodyProps()}>
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
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={8} className="text-center text-danger">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}
