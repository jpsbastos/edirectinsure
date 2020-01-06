import * as React from 'react';
import { Navbar } from 'react-bootstrap';
import { apiService } from '../../shared/api.service';

export class NavBar extends React.Component {
    public render(): JSX.Element {
        const userName = apiService.getUserName();
        const userArea = userName ? (
            <Navbar.Text>
                Signed in as: <a href="#login">{userName}</a>
            </Navbar.Text>
        ) : (
            <Navbar.Text>
                <a href="/signup">Signup</a> | <a href="/login">Login</a>
            </Navbar.Text>
        )
        return (
            <Navbar fixed="top" bg="dark" expand="md" variant="dark">
                <Navbar.Brand href="/">EDirectInsure</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                   {userArea}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}