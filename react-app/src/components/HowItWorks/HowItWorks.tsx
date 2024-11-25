import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HowItWorks.scss';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Set disbursement Instructions',
      description:
        'Get your blood tests delivered at home collect a sample from the your blood tests.',
    },
    {
      step: '02',
      title: 'Assembly retrieves funds from your account',
      description:
        'Get your blood tests delivered at home collect a sample from the your blood tests.',
    },
    {
      step: '03',
      title: 'Assembly initiates disbursement',
      description:
        'Get your blood tests delivered at home collect a sample from the your blood tests.',
    },
    {
      step: '04',
      title: 'Customer receives funds payment',
      description:
        'Get your blood tests delivered at home collect a sample from the your blood tests.',
    },
  ];

  return (
    <Container className="how-it-works my-5">
      <h5 className="text-center text-uppercase mb-3">What's the Function</h5>
      <h2 className="text-center mb-5">Let’s see how it works</h2>
      <Row className="gy-4">
        {steps.map((item, index) => (
          <Col key={index} md={3} className="text-center step">
            <div className="step-number">{item.step}</div>
            <h5 className="step-title">{item.title}</h5>
            <p className="step-description">{item.description}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HowItWorks;
