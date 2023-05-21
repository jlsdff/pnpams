/** @format */

import { Form, Button } from "react-bootstrap";
import { MutableRefObject, useRef, useState } from "react";
import axios from "axios";

type Props = {
    setRecords: (records: any) => void;
    setTitle: (title: string) => void;
};

export default function DailyForm({ setRecords, setTitle }: Props) {

    const dateRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    function handleGetRecords(event: any) {
        event.preventDefault();
        const date = dateRef.current?.value as string;
        const [year, month, day] = date?.split("-") as string[];

        if(dateRef.current?.value === null || dateRef.current?.value === undefined || dateRef.current?.value === ""){
            setError("Invalid date");
            return;
        }else {
            setError("");
        }

        const config = {
            url: "http://localhost:8080/api/v1/record",
            method: "GET",
            params: {
                month: Number.parseInt(month),
                day: Number.parseInt(day),
                year: Number.parseInt(year),
            },
        };

        axios
            .request(config)
            .then((response) => {
                setRecords(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setTitle(
            "Records for " +
                new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
        );
    }

    return (
        <div>
            <Form >
                <Form.Group className="mb-4 mt-4" >
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" size="sm" ref={dateRef} />
                    <Form.Text className="text-danger" >{error!}</Form.Text>
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
