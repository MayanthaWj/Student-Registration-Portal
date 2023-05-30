import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <Navbar bg="primary" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="#home">SATHMA INSTITUTE</Navbar.Brand>
            {/* <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#pricing">About</Nav.Link>
            </Nav> */}
            {/* <div >
              <Button variant="outline-success" style={{backgroundColor:"none", color:"white", border:"none"}}>Sign Out</Button>
            </div> */}
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;



