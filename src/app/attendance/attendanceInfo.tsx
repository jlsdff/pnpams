/** @format */

import styles from "./main.module.css";
import { Stack, Row, Col } from "react-bootstrap";

type Props = {
    data: any;
};

export default function AttendanceInfo({ data }: Props) {
    const timeIn = new Date(`${data?.date} ${data?.timeIn}`);
    const timeOut = data?.timeOut
        ? new Date(`${data?.date} ${data?.timeOut}`)
        : null;

    return (
        <Stack
            gap={3}
            className={`d-flex justify-content-center align-items-center ${styles.informationStack}`}
        >
            <div
                className={`${styles.information} p-4 text-center border rounded border-success bg-light`}
            >
                <h3 className="fs-1 fw-bold text-success">{`${
                    data?.officer?.lastName
                }, ${
                    data?.officer?.firstName
                } ${data?.officer?.middleName.charAt(0)}.`}</h3>
                <h4 className="fs-6 text-secondary">
                    {data?.officer?.badgeNumber}
                </h4>
                <Row className="fs-4 text-secondary ">
                    <Col>
                        <h5>
                            Time in:{" "}
                            <span className="fw-bold text-dark">
                                {timeIn?.toLocaleTimeString("en-US", {
                                    hour12: true,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </h5>
                    </Col>
                    <Col>
                        <h5>
                            Time Out:{" "}
                            <span className="fw-bold text-dark">
                                {timeOut?.toLocaleTimeString("en-US", {
                                    hour12: true,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </h5>
                    </Col>
                </Row>
                <Row className="fs-4 text-secondary ">
                    <Col>
                        <h5>
                            Date:{" "}
                            <span className="fw-bold text-dark">
                                {timeIn?.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </h5>
                    </Col>
                </Row>
            </div>
        </Stack>
    );
}
