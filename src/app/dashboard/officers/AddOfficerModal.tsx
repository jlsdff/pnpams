/** @format */

import { Button, Form, Col, Row } from "react-bootstrap";
import styles from "./table.module.css";
import { use, useEffect, useRef } from "react";
import { config } from "process";
import axios from "axios";
import moment from "moment";

export default function AddOfficerModal({ closeModal, officerData }: any) {
    if (officerData !== null) {
        officerData.dutyOn = moment(officerData.dutyOn, "h:mm A").format("HH:mm:ss");
        officerData.dutyOut = moment(officerData.dutyOut, "h:mm A").format("HH:mm:ss");
    }

    useEffect(() => {
        if (officerData !== null) {
            firstNameRef.current!.value = officerData.firstName;
            middleNameRef.current!.value = officerData.middleName;
            lastNameRef.current!.value = officerData.lastName;
            dutyStartRef.current!.value = officerData.dutyOn;
            dutyEndRef.current!.value = officerData.dutyOut;
            ranksRef.current!.value = officerData.ranks;
        }
    }, []);

    const firstNameRef = useRef<HTMLInputElement>(null);
    const middleNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const dutyStartRef = useRef<HTMLInputElement>(null);
    const dutyEndRef = useRef<HTMLInputElement>(null);
    const ranksRef = useRef<HTMLInputElement>(null);

    function submitForm(e: any) {
        e.preventDefault();
        if (officerData === null) {
            const dutyOn = new Date(
                "1995-12-17T" + dutyStartRef.current!.value
            ).toLocaleTimeString("en-US", {
                hour12: false,
            });
            const dutyOut = new Date(
                "1995-12-17T" + dutyEndRef.current!.value
            ).toLocaleTimeString("en-US", {
                hour12: false,
            });

            const config = {
                url: "http://localhost:8080/api/v1/officer",
                method: "POST",
                data: {
                    firstName: firstNameRef.current!.value,
                    middleName: middleNameRef.current!.value,
                    lastName: lastNameRef.current!.value,
                    dutyOn,
                    dutyOut,
                    ranks: ranksRef.current!.value,
                },
            };
            console.log(config);
            axios
                .request(config)
                .then((res: any) => {
                    console.log(res.data);
                    // window.location.reload();
                })
                .catch((err: any) => {
                    console.error(err);
                });
        } else {
            const dutyOn = new Date(
                "1995-12-17T" + dutyStartRef.current!.value
            ).toLocaleTimeString("en-US", {
                hour12: false,
            });
            const dutyOut = new Date(
                "1995-12-17T" + dutyEndRef.current!.value
            ).toLocaleTimeString("en-US", {
                hour12: false,
            });

            const config = {
                url: `http://localhost:8080/api/v1/officer/${officerData.badgeNumber}`,
                method: "PUT",
                data: {
                    badgeNumber: officerData.badgeNumber,
                    firstName: firstNameRef.current!.value,
                    middleName: middleNameRef.current!.value,
                    lastName: lastNameRef.current!.value,
                    dutyOn,
                    dutyOut,
                    ranks: ranksRef.current!.value,
                },
            };
            console.log(config);
            axios
                .request(config)
                .then((res: any) => {
                    console.log(res.data);
                    // window.location.reload();
                })
                .catch((err: any) => {
                    console.error(err);
                });
        }
    }

    return (
        <section className={`${styles.modal}`}>
            <div className={`${styles.modalContent} border rounded p-5`}>
                <h1 className="text-primary fw-bold">
                    {officerData === null ? "New Officer" : "Update Officer"}
                </h1>
                <Form onSubmit={submitForm}>
                    <Row className="mb-4">
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    size="lg"
                                    // value={officerData?.firstName}
                                    ref={firstNameRef}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    size="lg"
                                    // value={officerData?.middleName}
                                    ref={middleNameRef}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    size="lg"
                                    // value={officerData?.lastName}
                                    ref={lastNameRef}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Form.Group>
                                <Form.Label>Duty Start Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    size="lg"
                                    // value={officerData?.dutyOn}
                                    ref={dutyStartRef}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Duty Out Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    size="lg"
                                    // value={officerData?.dutyOut}
                                    ref={dutyEndRef}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col md={10}>
                            <Form.Group>
                                <Form.Label>Rank</Form.Label>
                                <Form.Control
                                    type="text"
                                    size="lg"
                                    // value={officerData?.ranks}
                                    ref={ranksRef}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col className={`${styles.displayContainer}`}>
                            <Button
                                type="submit"
                                variant="primary"
                                className="px-4 py-2"
                            >
                                {officerData === null
                                    ? "New Officer"
                                    : "Update Officer"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Button
                    onClick={closeModal}
                    variant="outline-secondary"
                    className={`${styles.closeButton} mt-5 me-5`}
                >
                    Close
                </Button>
            </div>
        </section>
    );
}
