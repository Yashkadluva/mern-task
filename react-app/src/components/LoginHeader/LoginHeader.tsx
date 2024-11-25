import React from 'react';
import { Navbar, Nav, Container, Button, Form, InputGroup } from 'react-bootstrap';
import './LoginHeader.scss';

const LoginHeader = () => {
  return (
    <div className="hero-section">
      {/* Header */}
      <header className="header">
        <Navbar expand="lg" className="custom-navbar">
          <Container>
            <Navbar.Brand href="#" className="brand-logo">
              <img src="logo.svg" alt="Logo" />
              Landguru
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#advertise">Advertise</Nav.Link>
                <Nav.Link href="#supports">Supports</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav>
              <Button className="try-free-btn" variant="warning">
                Try for Free
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Main Content */}
      <Container className="hero-content">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-lg-6 text-section">
            <p className="trusted-by">
              ⭐⭐⭐⭐⭐ Trusted by over 4,332 students
            </p>
            <h1>
              Learn Design with <span className="highlight">Nia Matos</span>
            </h1>
            <p className="description">
              Get your blood tests delivered at home collect sample from the victory of the managements that supplies the best design system guidelines ever.
            </p>
            {/* Search Bar */}
            <InputGroup className="search-bar">
              <Form.Control
                placeholder="Search Course Name"
                aria-label="Search Course Name"
              />
              <Button variant="outline-secondary">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
            <p className="sponsored">
              Sponsored by: <img src="paypal-logo.svg" alt="PayPal" />
              <img src="google-logo.svg" alt="Google" />
              <img src="dropbox-logo.svg" alt="Dropbox" />
            </p>
          </div>

          {/* Image Content */}
          <div className="col-lg-6 image-section">
            <div className="image-wrapper">
              <img
                src="hero-image.jpg"
                alt="Nia Matos"
                className="main-image"
              />
              <div className="overlay"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginHeader;
