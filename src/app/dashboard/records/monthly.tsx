/** @format */

import { Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import axios from "axios";

type Props = {
    setRecords: (records: any) => void;
    setTitle: (title: string) => void;
};

export default function MonthlyForm({
    setRecords,
    setTitle,
}: Props): JSX.Element {
    const [error, setError] = useState<string | null>(null);
    const monthYear = useRef<HTMLInputElement>(null);

    function handleGetRecords() {
        if (
            monthYear?.current?.value === "" ||
            monthYear?.current?.value === null ||
            monthYear?.current?.value === undefined
        ) {
            setError("Invalid month");
            return;
        }

        setError(null);

        const [year, month] = monthYear.current!.value.split("-") as string[];

        const config = {
            url: `http://localhost:8080/api/v1/record/monthly`,
            method: "GET",
            params: {
                month: Number.parseInt(month),
                year: Number.parseInt(year),
            }
        }

        axios.request(config)
            .then(res => {
                setRecords(res.data);
            })
            .catch(err => console.error(err))
        
        setTitle(`Records for ${monthYear.current!.value}`);

    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-4 mt-4">
                    <Form.Label>Enter Month</Form.Label>
                    <Form.Control type="month" size="sm" ref={monthYear} />
                    <Form.Text className="text-danger">{error!}</Form.Text>
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
