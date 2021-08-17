import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { Logo } from "../";
import "./Navbar.css";

const NavigationBar = () => {
  return (
    <Navbar animation="false" expand="lg" className="max-vw-100 shadow-sm bg-gray-100 top-display">
      <Container>
        <Nav.Link as={NavLink} to="/">
          <Navbar.Brand className="font-weight-700 logo-font  font-lg">
            <Logo />
          </Navbar.Brand>
        </Nav.Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse animation="false">
          <Nav>
            <Nav.Link
              className="d-flex justify-content-center"
              as={NavLink}
              to="/todo"
            >
              Todo
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="d-flex justify-content-center"
              as={NavLink}
              to="/sudoku"
            >
              Sudoku
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(NavigationBar);
