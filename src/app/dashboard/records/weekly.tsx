/** @format */

import axios from "axios";
import { AnyARecord } from "dns";
import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

type Props = {
    setRecords: (records: any) => void;
    setTitle: (title: string) => void;
};

export default function WeeklyForm({
    setRecords,
    setTitle,
}: Props): JSX.Element {
    const [startDate, setDate] = useState<string | null>(null);
    const endDate = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    function handleChangeDate(e: any) {
        const target = e.target;

        const [year, month, day] = target.value.split("-") as string[];
        const date = new Date(
            Number.parseInt(year),
            Number.parseInt(month) - 1,
            Number.parseInt(day)
        );
        date.setDate(date.getDate() + 7);
        endDate.current!.value = date.toISOString().split("T")[0];

        setDate(target.value);

        if(typeof(startDate) === 'string'  || startDate === ""){
            setError("");
            return;
        }


        
    }

    function handleGetRecords(e: any) {
        e.preventDefault();

        const dateStart:Date = new Date(startDate!);

        const [yearStart, monthStart, dayStart] = dateStart.toISOString().split("T")[0].split("-") as string[];

        console.log(yearStart, monthStart, dayStart)

        if(startDate === null || startDate === undefined || startDate === ""){
            setError("Invalid date");
            return;
        }

        const config = {
            url: "http://localhost:8080/api/v1/record/weekly",
            method: "GET",
            params: {
                month: Number.parseInt(monthStart),
                day: Number.parseInt(dayStart),
                year: Number.parseInt(yearStart),
            },
        }

        axios.request(config)
        .then((response) => {
            setRecords(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        })

        setTitle(
            "Records for " +
                new Date(startDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }) + " to " +
                new Date(endDate.current!.value).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
        );

        setError("");

    }

    return (
        <div>
            <Form >
                <Form.Group className="mb-2 mt-4">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        size="sm"
                        onChange={handleChangeDate}
                    />
                    <Form.Text className="text-danger" >{error!}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        size="sm"
                        ref={endDate}
                        disabled
                        readOnly
                    />
                </Form.Group>

                <Form.Group>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleGetRecords}
                    >
                        Get Records
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}
