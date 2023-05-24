/** @format */

import { useState } from "react";
import { useAsyncDebounce } from "react-table";

export default function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}: any) {

    const count = preGlobalFilteredRows.length;

    const [value, setValue] = useState(globalFilter);

    // const onChange = useAsyncDebounce( value => {
    //     setGlobalFilter(value || undefined);
    // }, 300);

    const onChange = (value: any) => {
        setGlobalFilter(value || undefined);
    };

    return (
        <span>
            Search:{" "}
            <input
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: "1.1rem",
                    border: "0",
                }}
            />
        </span>
    );
}
