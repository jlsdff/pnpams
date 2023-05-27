/** @format */

import { Stack, Table, Container } from "react-bootstrap";
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

            const statusContainer = <Container>
                {record.late && <span className="text-danger fs-6 py-2 px-3 border border-0 rounded-pill bg-danger text-light text-center me-2">late</span>}
                {record.undertime && <span className="text-danger fs-6 py-2 px-3 border border-0 rounded-pill bg-secondary text-light text-center me-2">undertime</span>}
                {record.overtime && <span className="text-success fs-6 py-2 px-3 border border-0 rounded-pill bg-success text-light text-center me-2">overtime</span>}
            </Container>

            const timein = new Date(`${record.date} ${record.timeIn}`).toLocaleTimeString("en-US", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit"
            });
            const timeOut = new Date(`${record.date} ${record.timeOut}`).toLocaleTimeString("en-US", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit"
            });
            const date = new Date(record.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            
            return {
                lastName: record.officer.lastName,
                firstName: record.officer.firstName,
                middleName: record.officer.middleName.charAt(0) + ".",
                badgeNumber: record.officer.badgeNumber,
                timeIn: timein !== "Invalid Date" ? timein : "N/A",
                timeOut: timeOut !== "Invalid Date" ? timeOut : "N/A",
                date: date ? timein : "N/A",
                status: statusContainer,
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
