/** @format */
"use client";
import { ButtonGroup, Button } from "react-bootstrap";

type Props = {
    handleFilter: (event: any) => void;
    activeFilter: string;
};

export default function FilterButtonGroup({
    handleFilter,
    activeFilter,
}: Props): JSX.Element {
    return (
        <ButtonGroup aria-label="Basic example">
            <Button
                variant={activeFilter === "daily" ? "link" : "light"}
                onClick={handleFilter}
                name="daily"
            >
                Daily
            </Button>
            <Button
                variant={activeFilter === "weekly" ? "link" : "light"}
                onClick={handleFilter}
                name="weekly"
            >
                Weekly
            </Button>
            <Button
                variant={activeFilter === "monthly" ? "link" : "light"}
                onClick={handleFilter}
                name="monthly"
            >
                Monthly
            </Button>
            <Button
                variant={activeFilter === "annualy" ? "link" : "light"}
                onClick={handleFilter}
                name="annualy"
            >
                Annualy
            </Button>
        </ButtonGroup>
    );
}
