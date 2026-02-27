import React, { useState } from 'react';

const AuthCard = ({ 
  title, 
  subtitle, 
  children, 
  footerText, 
  footerLink, 
  footerLinkText 
}) => {
  return (
    <div className="auth-card">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1F2933', marginBottom: '0.5rem' }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
            {subtitle}
          </p>
        )}
      </div>
      
      {children}
      
      {footerText && footerLink && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>
            {footerText}{' '}
            <a 
              href={footerLink} 
              style={{ 
                color: '#2563EB', 
                textDecoration: 'none', 
                fontWeight: '500' 
              }}
            >
              {footerLinkText}
            </a>
          </span>
        </div>
      )}
    </div>
  );
};

export default AuthCard;
