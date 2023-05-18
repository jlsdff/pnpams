/** @format */

'use client'

import { useEffect, useState } from "react";
import FilterButtonGroup from "./filterButtonGroup";
import DailyForm from "./daily";

type Props = {
    setRecords: (records: any) => void;
};

export default function Filter({ setRecords }: Props) {

    const [filter, setFilter] = useState<string>("daily");

    function handleFilter(event: any) {
        const target = event.target;
        setFilter(target.name);
    }

    useEffect(()=>{

    },[filter])

    return (
        <div>
            <FilterButtonGroup handleFilter={handleFilter} activeFilter={filter} />
            {
                filter === "daily" && <DailyForm />
            }
            {
                filter === "weekly" && <div>weekly</div>
            }
            {
                filter === "monthly" && <div>monthly</div>
            }
            {
                filter === "annualy" && <div>annualy</div>
            }
        </div>
    );
}
