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
        <>
        <h6>Get Records By: </h6>
        <ButtonGroup aria-label="Basic example">
            
            <Button
                variant={
                    activeFilter === "daily"
                        ? "outline-primary"
                        : "outline-secondary"
                }
                onClick={handleFilter}
                name="daily"
            >
                Daily
            </Button>
            <Button
                variant={
                    activeFilter === "weekly"
                        ? "outline-primary"
                        : "outline-secondary"
                }
                onClick={handleFilter}
                name="weekly"
            >
                Weekly
            </Button>
            <Button
                variant={
                    activeFilter === "monthly"
                        ? "outline-primary"
                        : "outline-secondary"
                }
                onClick={handleFilter}
                name="monthly"
            >
                Monthly
            </Button>
            <Button
                variant={
                    activeFilter === "annualy"
                        ? "outline-primary"
                        : "outline-secondary"
                }
                onClick={handleFilter}
                name="annualy"
            >
                Annualy
            </Button>
        </ButtonGroup>
        </>
    );
}
