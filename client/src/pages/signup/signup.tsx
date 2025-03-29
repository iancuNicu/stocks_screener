import { useState } from "react";
import { Button, Form, Nav } from "react-bootstrap";

import './signup.scss';

export function SignupPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [name, setName] = useState("");
    const [repeat_pass, setRePassword] = useState("");

    const [passCheck, setPassCheck] = useState(true);

    const passwordCheck = (password: string, setterFct: any) => {
       const emailRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
       setPassCheck(!!password.match(emailRegexp)?.length); 
       setterFct(password);
    }   
    
    const handleSubmit = () => {
        if(passCheck){

        }
    }
    
    return (
        <div className="singup-background">
            <div className="signup-container container">
            <div className='login-header'>
                    <h1>Signup</h1>
                    <Nav className="justify-content-center">
                        <Nav.Item>
                        <Nav.Link href="/login">
                                <span className='register-text'>Already a user?</span>
                                Login
                            </Nav.Link> 
                        </Nav.Item>
                    </Nav>
                </div>

                <Form className='signup-form' onSubmit={handleSubmit}>

                    <Form.Group className='mb-3 form-group' controlId='name'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control size="sm" type="text" placeholder='Name' 
                                    value={name} onChange={(ev) => setName(ev.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3 form-group' controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control size="sm" type="email" placeholder='Enter email' 
                                    value={email} onChange={(ev) => setEmail(ev.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3 form-group' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control size="sm" type="password" placeholder='Enter password' 
                                    value={password} onChange={(ev) => passwordCheck(ev.target.value, setPassword)}>
                        </Form.Control>
                        {!passCheck && <Form.Text className='pass-incorect'
                                   id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long, contain letters and numbers,
                            and must not contain spaces, special characters, or emoji.
                        </Form.Text>}
                    </Form.Group>

                    <Form.Group className='mb-3 form-group' controlId='reapeat-password'>
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control size="sm" type="password" placeholder='Repeat password' 
                                    value={repeat_pass} onChange={(ev) => passwordCheck(ev.target.value, setRePassword)}>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="outline-primary" type='submit'
                            disabled={!passCheck}
                            size="lg">
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    );
    
 }