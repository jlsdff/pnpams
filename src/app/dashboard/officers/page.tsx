/** @format */

"use client";

import { type } from "os";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { isAwaitExpression } from "typescript";
import axios from "axios";
import OfficerTable from "./table";
import { Metadata } from "next";
import AddOfficerModal from "./AddOfficerModal";

type Officer = {
    badgeNumber: number;
    firstName: string;
    lastName: string;
    middleName: string;
    dutyOn: Date;
    dutyOut: Date;
    ranks: string;
};

export const metadata: Metadata = {
    title: "Officers",
    description: "Officers of MPD Sta. Mesa",
};

export default function Officer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [officer, setOfficer] = useState<Officer | null>(null);

    function openModal(officer: Officer) {
        if (officer) {
            setOfficer(officer);
        }else {
            setOfficer(null);
        }
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <>
            {isModalOpen && (
                <AddOfficerModal
                    closeModal={closeModal}
                    officerData={officer}
                />
            )}
            <OfficerTable openModal={openModal} />
        </>
    );
}
