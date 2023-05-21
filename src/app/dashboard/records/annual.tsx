/** @format */

import axios from "axios";
import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

type Props = {
    setRecords: (records: any) => void;
    setTitle: (title: string) => void;
};

export default function AnnualForm({ setRecords, setTitle }: Props) {
    const yearRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    function handleGetRecords(event: any) {
        event.preventDefault();
        event.stopPropagation();

        if (
            yearRef.current?.value === "" ||
            yearRef.current?.value === null ||
            yearRef.current?.value === undefined
        ) {
            setError("Invalid year");
            return;
        } else {
            setError(null);
        }

        const config = {
            url: "http://localhost:8080/api/v1/record/annual",
            method: "GET",
            params: {
                year: Number.parseInt(yearRef.current?.value),
            },
        };

        axios
            .request(config)
            .then((res) => {
                setRecords(res.data);
            })
            .catch((err) => console.error(err));

        setTitle(`Records for year ${yearRef.current!.value}`);
    }

    return (
        <div>
            <Form onSubmit={handleGetRecords}>
                <Form.Group className="mb-4 mt-4">
                    <Form.Label>Enter Year:</Form.Label>
                    <Form.Control
                        type="number"
                        size="sm"
                        min={1000}
                        max={9999}
                        ref={yearRef}
                    />
                    <Form.Text className="text-danger">{error!}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" size="sm" type="submit">
                        Get Records
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}
