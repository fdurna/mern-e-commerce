import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">e-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#home">
                                <i className="fas fa-shopping-cart"></i>
                                Cart
                                </Nav.Link>
                            <Nav.Link href="#link">
                                <i className="fas fa-shopping-cart"></i>
                                Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
