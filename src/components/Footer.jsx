import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Law Finder</h3>
            <p>Tu fuente confiable de información legal</p>
          </div>
          <div className="col-md-3">
            <h4>Enlaces útiles</h4>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/about">Acerca de</a></li>
              <li><a href="/contact">Contacto</a></li>
              <li><a href="/privacy">Política de privacidad</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Contacto</h4>
            <p>Dirección: Calle Principal, Ciudad, País</p>
            <p>Teléfono: +123456789</p>
            <p>Email: info@lawfinder.com</p>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="container">
          <p className="text-center">Law Finder - Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
