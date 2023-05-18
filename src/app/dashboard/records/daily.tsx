/** @format */

import { Form } from "react-bootstrap";

export default function DailyForm() {
    return (
        <div>
            <br />
            <Form>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" placeholder="Enter email" size="sm"/>
            </Form>
        </div>
    );
}
