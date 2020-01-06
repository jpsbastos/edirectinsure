import * as React from 'react';
import { BasePage } from './base.page';
import { Form, Button } from 'react-bootstrap';
import { userService } from './../shared/user.service';


interface IState {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export class RegisterPage extends BasePage<{}> {

    public state: IState = {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    };

    /**
     * Renders the register's page
     */
    public render(): JSX.Element {
        return (
            <div className="page register-page">
                <h1>Register</h1>
                <Form className="register" onSubmit={(e) => this.handleSubmit(e)} validated={true}>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter first name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleOnChange(e, 'firstName')}/>
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter last name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleOnChange(e, 'lastName')} />
                    </Form.Group>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" placeholder="Enter username"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleOnChange(e, 'username')}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control minLength={6} required type="password" placeholder="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleOnChange(e, 'password')}/>
                        <Form.Text className="text-muted">
                            The password must have at least 6 characters.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

    private handleSubmit(event: any) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
            const { ...user } = this.state;
            userService.registerUser(user).subscribe(() => {
                alert('SUCCESS!');
                setTimeout(() => this.props.history.push('/'), 2000);
            })

        } else {
            alert('Fill the form correctly!');
        }
    }

    private handleOnChange(e: React.ChangeEvent<HTMLInputElement>, field: string) {
        this.setState({ [field]: e.target.value})
    }

   
}
