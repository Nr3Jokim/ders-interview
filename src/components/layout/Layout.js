import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const Layout = (props) => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <div className="container">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/about" className="nav-link">About</Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>

            <Container className={'d-flex align-items-center justify-content-center flex-column my-4'}>
                {props.children}
            </Container>

            <footer className="bg-light py-3">
                <Container>
                    <p>Generic footer noone reads - This project has been made by Jakub Konečný</p>
                </Container>
            </footer>
        </div>
    );
}

export default Layout;