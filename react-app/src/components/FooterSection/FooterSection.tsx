import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './FooterSection.scss';

const FooterSection = () => {
  const footerLinks = [
    {
      title: 'About Us',
      links: [
        'Support Center',
        'Customer Support',
        'About Us',
        'Copyright',
        'Popular Campaign',
      ],
    },
    {
      title: 'Our Information',
      links: [
        'Return Policy',
        'Privacy Policy',
        'Terms & Conditions',
        'Site Map',
        'Store Hours',
      ],
    },
    {
      title: 'My Account',
      links: [
        'Press inquiries',
        'Social media directories',
        'Images & B-roll',
        'Permissions',
      ],
    },
    {
      title: 'Policy',
      links: [
        'Application security',
        'Software principles',
        'Unwanted software policy',
        'Responsible supply chain',
      ],
    },
  ];

  return (
    <div className="footer-section">
      <Container className="text-center my-5">
        <h2 className="heading">
          Ready to learn design <br /> with Nia Matos
        </h2>
        <Button variant="warning" className="cta-button">
          Start Learning Today
        </Button>
      </Container>
      <hr />
      <Container className="footer-links">
        <Row>
          {footerLinks.map((column, index) => (
            <Col key={index} md={3} sm={6}>
              <h5>{column.title}</h5>
              <ul>
                {column.links.map((link, idx) => (
                  <li key={idx}>{link}</li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FooterSection;
