/** @format */
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import * as xlsx from "xlsx";

type Props = {
    data: any;
    fileName: string;
    sheetName: string;
    buttonName: string;
};

export default function ExportButton({
    data,
    fileName,
    sheetName,
    buttonName,
}: Props) {
    const datas = data.map((d: any) => {
        return {
            "Badge Number": d.officer.badgeNumber,
            "Last Name": d.officer.lastName,
            "First Name": d.officer.firstName,
            "Middle Name": d.officer.middleName,
            "Time In": d.timeIn,
            "Time Out": d.timeOut,
            Date: d.date,
            Ranks: d.officer.ranks,
            "Duty On": d.officer.dutyOn,
            "Duty Out": d.officer.dutyOut,
            Late: d.late,
            "Under Time": d.undertime,
            Overtime: d.overtime,
            Admin: `${d.admin.lastName}, ${d.admin.firstName}`,
        };
    });

    function onExport() {
        const workbook = xlsx.utils.book_new();
        const sheet = xlsx.utils.json_to_sheet(datas);
        xlsx.utils.book_append_sheet(workbook, sheet, sheetName);
        xlsx.writeFile(workbook, `${fileName}.xlsx`);
    }

    return (
        <Button size="sm" onClick={onExport}>
            {buttonName}
        </Button>
    );
}
