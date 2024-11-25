import React from 'react';
import { Container, Row, Col, Card, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import './PricingPlan.scss';

const PricingPlan = () => {
  return (
    <div className="pricing-plan">
      <Container>
        {/* Header Section */}
        <div className="text-center my-4">
          <h6 className="subtitle">PRICING PLAN</h6>
          <h2 className="title">Choose your pricing policy</h2>
          <ToggleButtonGroup type="radio" name="plan-options" className="mt-3">
            <ToggleButton id="monthly-plan" variant="outline-primary" value={1}>
              Monthly Plan
            </ToggleButton>
            <ToggleButton id="annual-plan" variant="outline-primary" value={2}>
              Annual Plan
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Pricing Cards */}
        <Row className="mt-5">
          {/* Free Plan */}
          <Col md={6}>
            <Card className="plan-card">
              <Card.Body>
                <h5 className="plan-title">Free Plan</h5>
                <p className="plan-subtitle">For Small teams or office</p>
                <ul className="features-list">
                  <li>Ultimate access to all course, exercises and assessments</li>
                  <li>Free access for all kinds of exercise corrections with downloads</li>
                  <li>Total assessment corrections with free download access system</li>
                  <li className="disabled">Unlimited download of courses on the mobile app contents</li>
                  <li className="disabled">Download and print courses and exercises in PDF</li>
                </ul>
                <Button variant="warning" className="cta-button">
                  Start free trial
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Premium Plan */}
          <Col md={6}>
            <Card className="plan-card premium">
              <Card.Body>
                <div className="badge">Recommended</div>
                <h5 className="plan-title">Premium</h5>
                <p className="plan-subtitle">For startup enterprise</p>
                <h3 className="price">49.99/mo</h3>
                <ul className="features-list">
                  <li>Ultimate access to all course, exercises and assessments</li>
                  <li>Free access for all kinds of exercise corrections with downloads</li>
                  <li>Total assessment corrections with free download access system</li>
                  <li>Unlimited download of courses on the mobile app contents</li>
                  <li>Download and print courses and exercises in PDF</li>
                </ul>
                <Button variant="warning" className="cta-button">
                  Subscribe Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PricingPlan;
