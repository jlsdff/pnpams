/** @format */

import { Form, Col, Row, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import axios from "axios";

type Props = {};

export default function NewRecord({}: Props) {
    const badgeNumberRef = useRef<HTMLInputElement>(null);
    const date = useRef<HTMLInputElement>(null);
    const timeIn = useRef<HTMLInputElement>(null);
    const timeOut = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    function addRecord() {
        const admin = JSON.parse(sessionStorage.getItem("admin")!);

        const timeInDate = new Date(
            date.current!.value + " " + timeIn.current!.value
        );
        console.log(
            "timeInDate: ",
            timeInDate.toLocaleTimeString("en-US", {
                hour12: false,
            })
        );
        const timeOutDate = new Date(
            date.current!.value + " " + timeOut.current!.value
        );
        console.log(
            "timeOutDate: ",
            timeOutDate.toLocaleTimeString("en-US", {
                hour12: false,
            })
        );

        const config = {
            url: "http://localhost:8080/api/v1/record/whole",
            method: "POST",
            data: {
                badgeNumber: Number.parseInt(badgeNumberRef.current!.value),
                date: date.current!.value,
                timeIn: timeInDate.toLocaleTimeString("en-US", {
                    hour12: false,
                }),
                timeOut: timeOutDate.toLocaleTimeString("en-US", {
                    hour12: false,
                }),
                adminId: admin.admin_id,
            },
        };

        axios
            .request(config)
            .then((res) => {
                if (res.data === "" || res.data === null) {
                    console.log(res.data);
                    setError("Invalid badge number");
                } else {
                    console.log(res.data);
                    window.location.reload();
                    setError(null);
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Invalid badge number");
            });
    }

    return (
        <section className="p-3 border rounded">
            <h4 className="text-primary fw-bold">New Record</h4>
            <div>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Badge Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    size="sm"
                                    ref={badgeNumberRef}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    size="sm"
                                    ref={date}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Time In</Form.Label>
                                <Form.Control
                                    type="time"
                                    size="sm"
                                    ref={timeIn}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Time Out</Form.Label>
                                <Form.Control
                                    type="time"
                                    size="sm"
                                    ref={timeOut}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <p className="text-danger">{error}</p>
                    </Row>
                    <Button size="sm" onClick={addRecord}>
                        Add Record
                    </Button>
                </Form>
            </div>
        </section>
    );
}
