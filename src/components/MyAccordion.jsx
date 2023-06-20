import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .card {
    width: 100%;
    border: 1px solid #ccc; /* Agregado: borde de 1px sólido */
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .card-header {
    background-color: #f8f9fa;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }

  .card-header:hover {
    background-color: #e9ecef;
  }

  .card-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  .collapse {
    display: none;
    padding: 10px;
  }

  .collapse.show {
    display: block;
  }

  .link-card-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .accordion-content {
    padding: 16px;

    div.item {
      border: 1px solid #ccc; /* Agregado: borde de 1px sólido */
      border-radius: 4px;
      padding: 8px;
      margin-bottom: 12px;
    }
  }

  .accordion-content h4 {
    margin-top: 0;
    font-size: 16px;
    font-weight: bold;
  }

  .accordion-content p {
    margin-bottom: 5px;
    font-size: 14px;
  }
`;

const MyAccordion = ({ title, items }) => {
  const [activeIndex, setActiveIndex] = useState(false);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(false);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <AccordionWrapper>
      <div className="accordion">
        <div className="card">
          <div className="card-header" onClick={() => toggleAccordion(null)}>
            <h2>{title}</h2>
          </div>
          <div className={`collapse ${activeIndex === null ? '' : 'show'}`}>
            <div className="accordion-content">
              {items.length === 0 && <p>No hay archivos</p>}

              {items.map((item, index) => (
                <div key={index} className={'item'}>
                  <h4>Titulo: {item[1]}</h4>
                  <p>Instancia: {item[2]}</p>
                  <p>Fecha: {item[3]}</p>
                  <a href={item[0]} target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://img.freepik.com/iconos-gratis/pdf_318-187733.jpg"
                      className="link-card-icon"
                      alt="pdf icon"
                    />
                    Documento #{index + 1}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AccordionWrapper>
  );
};

export default MyAccordion;
