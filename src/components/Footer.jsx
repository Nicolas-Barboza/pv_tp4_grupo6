// components/Footer.jsx

import React from 'react';

const Footer = () => {
return (
    <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 0',
        textAlign: 'center',
        width: '100vw',
        position: 'fixed',
        left: 0,
        bottom: 0,
        margin: 0,
        zIndex: 100,
    }}>
        <p style={{ margin: 0 }}>Grupo 6 Programación Visual - FI Unju</p>
        <p style={{ margin: 0 }}>&copy; 2025. Todos los derechos reservados.</p>
    </footer>
);
};

export default Footer;