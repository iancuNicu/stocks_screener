import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './navbar.scss';
import logo from '../../assets/images/logo.png';
import { FiUser } from 'react-icons/fi';
import { Search } from '../search/search';

import { Link } from 'react-router-dom';

export function Navigation() {

    return (
        <Container fluid>
            <Navbar className='d-flex justify-content-between px-4' 
                    fixed="top" bg="light">
                <Navbar.Brand href='/'>
                    <Image width="50px" height="50px" 
                           fluid={false} src={logo}>
                    </Image>   
                </Navbar.Brand>
                <Search></Search>
                <Nav variant="light" className='d-flex nav-custom'>
                    <Nav.Link>
                        Portofolio
                    </Nav.Link>
                    <Nav.Link>
                        On watch
                    </Nav.Link>
                    <Nav.Link as={Link} to="queries"> 
                        Queries
                    </Nav.Link>
                    <NavDropdown title={<FiUser className='user-icon' />} id="navUser">
                        <NavDropdown.Item>
                            Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            Settings
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </Container>
    );

}