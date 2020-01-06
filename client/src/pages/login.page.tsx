import * as React from 'react';
import { BasePage } from './base.page';
import { Form, Button } from 'react-bootstrap';
import { userService } from './../shared/user.service';


interface IState {
    username: string;
    password: string;
}

export class LoginPage extends BasePage<{}> {

    public state: IState = {
        username: '',
        password: ''
    };

    /**
     * Renders the login's page
     */
    public render(): JSX.Element {
        return (
            <div className="page login-page">
                <h1>Login</h1>
                <Form className="login" onSubmit={(e) => this.handleSubmit(e)} validated={true}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" placeholder="Enter username"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleOnChange(e, 'username')}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control minLength={6} required type="password" placeholder="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleOnChange(e, 'password')}/>
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
            userService.authenticateUser(user).subscribe((data) => {
                alert('Success!');
                setTimeout(() => this.props.history.push('/'), 2000);
            }, (err) => alert('Login Failed!'));

        } else {
            alert('Fill the form!');
        }
    }

    private handleOnChange(e: React.ChangeEvent<HTMLInputElement>, field: string) {
        this.setState({ [field]: e.target.value})
    }

   
}
