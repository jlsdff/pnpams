/** @format */

import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

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
        <>
            <Row>
                <Col  >
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => {
                            setValue(e.target.value);
                            onChange(e.target.value);
                        }}
                        className="mb-3"
                    />
                </Col>
                {/* <Col md={2}>
                    <Button size="sm">Get Officer List</Button>
                </Col> */}
            </Row>
        </>
    );
}
