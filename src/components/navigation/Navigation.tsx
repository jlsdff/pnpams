/** @format */
import { Container, Navbar, Dropdown, Button } from "react-bootstrap";
import styles from "./navigation.module.css";

export default function Navigation({}) {

    const admin = JSON.parse(sessionStorage.getItem("admin") || "{}");

    function handleLogout() {}

    return (
        <Navbar>
            <Container fluid>
                <Navbar.Brand>
                    <img
                        src="/images/PNP-Logo.png"
                        alt=""
                        className={`${styles.logo}`}
                    />
                    <span>P.N.P. Attendance Monitoring System</span>
                </Navbar.Brand>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <img
                            src="/images/profile-icon.png"
                            alt=""
                            className={`${styles.profileIcon}`}
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="p-3">
                        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                            Something else
                        </Dropdown.Item> */}
                        <p>{`${admin.lastName}, ${admin.firstName}`}</p>
                        <Dropdown.Divider />
                        <Button onClick={handleLogout} variant="light">
                            Logout
                        </Button>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    );
}
