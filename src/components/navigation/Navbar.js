import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";

import "./Navbar.css";

const Navigation = () => {
  return (
    <Navbar animation="false" expand="lg" className="min-vw-100 shadow-sm">
      <Container>
        <Nav.Link as={NavLink} to="/">
          <Navbar.Brand className="font-weight-700 logo-font  font-lg">
            My React App <span className=" logo-font">:)</span>
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

export default withRouter(Navigation);
