/** @format */
import { Container, Stack, Form, Button } from "react-bootstrap";
import styles from "./main.module.css";

type Props = {
    handleSubmit: (e: any) => void;
    badgeNumberRef: any;
    error: string | null;
};

export default function LoginForm({
    handleSubmit,
    badgeNumberRef,
    error,
}: Props) {
    return (
        <Stack
            gap={3}
            className={`d-flex justify-content-center align-items-center ${styles.stack}`}
        >
            <Form onSubmit={handleSubmit} className="p-4 rounded">
                <img
                    src="/images/PNP-Logo.png"
                    alt=""
                    className={`${styles.logo}`}
                />
                <Form.Group>
                    <Form.Label className="text-light">
                        Enter your badge number:{" "}
                    </Form.Label>
                    <Form.Control type="number" ref={badgeNumberRef} required />
                    <Form.Text className="text-light">{error!}</Form.Text>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" className="mt-4" type="submit">
                        Enter
                    </Button>
                </div>
            </Form>
        </Stack>
    );
}
