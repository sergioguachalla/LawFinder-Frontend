import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #f5f5f5;
  padding: 20px 0;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FooterColumn = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: calc(50% - 10px);
    margin-bottom: 0;
  }
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  color: #333;
  text-decoration: none;

  &:hover {
    color: #555;
  }
`;

const FooterText = styled.p`
  margin-bottom: 10px;
`;

const BottomBar = styled.div`
  background-color: #ddd;
  padding: 10px 0;
`;

const BottomBarText = styled.p`
  margin: 0;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterRow>
          <FooterColumn>
            <FooterTitle>Law Finder</FooterTitle>
            <FooterText>Tu fuente confiable de información legal</FooterText>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Enlaces útiles</FooterTitle>
            <ul>
              <li>
                <FooterLink href="/">Inicio</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">Acerca de</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contacto</FooterLink>
              </li>
              <li>
                <FooterLink href="/privacy">Política de privacidad</FooterLink>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Contacto</FooterTitle>
            <FooterText>Dirección: Calle Principal, Ciudad, País</FooterText>
            <FooterText>Teléfono: +123456789</FooterText>
            <FooterText>Email: info@lawfinder.com</FooterText>
          </FooterColumn>
        </FooterRow>
      </FooterContainer>
      <BottomBar>
        <FooterContainer>
          <BottomBarText>
            Law Finder - Todos los derechos reservados &copy; {new Date().getFullYear()}
          </BottomBarText>
        </FooterContainer>
      </BottomBar>
    </FooterWrapper>
  );
};

export default Footer;
