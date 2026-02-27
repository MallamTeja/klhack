import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';

const Landing = () => {
  const features = [
    {
      icon: '📄',
      title: 'OCR Invoice Extraction',
      description: 'AI-powered OCR technology automatically extracts data from your invoice images with high accuracy.'
    },
    {
      icon: '🧮',
      title: 'Automatic GST Calculation',
      description: 'Smart algorithms calculate GST amounts automatically based on invoice data and current tax rates.'
    },
    {
      icon: '📊',
      title: 'GSTR-1 Draft Generator',
      description: 'Generate ready-to-file GSTR-1 drafts in the correct format for easy GST filing.'
    },
    {
      icon: '📁',
      title: 'CSV Export',
      description: 'Export your GST data in CSV format for easy integration with accounting software.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Upload Invoice',
      description: 'Simply upload your invoice images or drag and drop them into our secure platform.'
    },
    {
      number: '2',
      title: 'AI Extracts Data',
      description: 'Our advanced AI OCR technology automatically extracts all relevant GST information.'
    },
    {
      number: '3',
      title: 'Download GST Draft',
      description: 'Get your GSTR-1 draft file ready for filing or export in your preferred format.'
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Automate GST Filing with AI
          </h1>
          <p className="hero-subtitle">
            Upload invoices → Generate GSTR-1 drafts instantly
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Powerful Features for Your Business</h2>
            <p>Everything you need to simplify your GST filing process</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>How It Works</h2>
            <p>Get your GST filings done in 3 simple steps</p>
          </div>
          
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="card step-card">
                <div className="step-number">
                  {step.number}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a href="#about" className="footer-link">About</a>
            <a href="#contact" className="footer-link">Contact</a>
            <a href="#privacy" className="footer-link">Privacy</a>
            <a href="#terms" className="footer-link">Terms</a>
          </div>
          <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            © 2024 GST Agent. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Landing;
