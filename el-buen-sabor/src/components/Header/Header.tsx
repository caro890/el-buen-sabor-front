import { Navbar, Container, Nav } from "react-bootstrap"

export const Header = () => {
  return (
    <Navbar bg="primary" fixed="top" sticky="top" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/">El buen sabor</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Admin Dashboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}
