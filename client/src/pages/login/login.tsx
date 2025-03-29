import { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/form'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import AuthenticationService from '../../services/authentication/authentication.service';
import './login.scss';
import { setError, setLoading } from '../../redux/slices/app.slice';

 export function LoginPage() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    const [token, setAuthCookie, removeAuthCookie] = useCookies(['auth_token']);
    const [refresh_token, setRefreshToken, removeRefreshToken] = useCookies(['refresh_token'])

    const handleSubmit = async (ev:any) => {
        dispatch(setLoading(true));
        ev.preventDefault();
        try {
            const response = await AuthenticationService.login(email, password); 
            setAuthCookie('auth_token',response.data.access_token);
            setRefreshToken("refresh_token",response.data.refresh_token);
            dispatch(setLoading(false));
            navigate('/');
        }
        catch(e: any) {
            dispatch(setLoading(false));
            dispatch(setError(e.message));
            return null;
        }
    }

    return (
        <div className='login-background'>
            <div className='login-container container'>

                <div className='login-header'>
                    <h1>Login</h1>
                    <Nav className="justify-content-center">
                        <Nav.Item>
                        <Nav.Link href="/signup">
                                <span className='register-text'>Are you not registered? </span>
                                Signup
                            </Nav.Link> 
                        </Nav.Item>
                    </Nav>
                </div>

                <Form className='login-form' onSubmit={handleSubmit}>
                    <Form.Group className='mb-3 form-group' controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder='Enter email' 
                                    value={email} onChange={(ev) => setEmail(ev.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3 form-group' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder='Enter password' 
                                    value={password} onChange={(ev) => setPassword(ev.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="outline-primary" type='submit'
                            size="lg">
                        Login
                    </Button>
                </Form>

            </div>
        </div>
    ) 

}