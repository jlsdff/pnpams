/** @format */

"use client";

import { MutableRefObject, useEffect, useState } from "react";
import FilterButtonGroup from "./filterButtonGroup";
import DailyForm from "./daily";
import WeeklyForm from "./weekly";
import MonthlyForm from "./monthly";
import AnnualForm from "./annual";

type Props = {
    setRecords: (records: any) => void;
    setTitle: (title: string) => void;
};

export default function Filter({ setRecords, setTitle }: Props) {
    const [filter, setFilter] = useState<string>("daily");

    function handleFilter(event: any) {
        const target = event.target;
        setFilter(target.name);
    }

    useEffect(() => {}, [filter]);

    return (
        <div>
            <FilterButtonGroup
                handleFilter={handleFilter}
                activeFilter={filter}
            />
            {filter === "daily" && (
                <DailyForm setRecords={setRecords} setTitle={setTitle} />
            )}
            {filter === "weekly" && (
                <WeeklyForm setRecords={setRecords} setTitle={setTitle} />
            )}
            {filter === "monthly" && (
                <MonthlyForm setRecords={setRecords} setTitle={setTitle} />
            )}
            {filter === "annualy" && (
                <AnnualForm setRecords={setRecords} setTitle={setTitle} />
            )}
        </div>
    );
}
