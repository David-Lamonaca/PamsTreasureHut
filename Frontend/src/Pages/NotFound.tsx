import React from 'react';

const NotFound: React.FC = () => 
{
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            color: '#343a40', 
            fontFamily: 'Arial, sans-serif', 
            textAlign: 'center', 
        }}>
            <h1 style={{ 
                fontSize: '6rem', 
                marginBottom: '20px', 
                color: '#dc3545', 
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
            }}>404</h1>

            <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '10px', 
                color: '#495057',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)'
            }}>Oops! Page Not Found</h2>

            <p style={{ 
                fontSize: '1.3rem', 
                marginBottom: '30px', 
                color: '#6c757d', 
                maxWidth: '600px'
            }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <a 
                href="/" 
                style={{ 
                    padding: '12px 25px', 
                    backgroundColor: '#007bff', 
                    color: '#ffffff', 
                    textDecoration: 'none', 
                    borderRadius: '25px', 
                    fontSize: '1.1rem', 
                    transition: 'background-color 0.3s ease',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
                Go Back Home
            </a>
            
        </div>
    );
};

export default NotFound;
