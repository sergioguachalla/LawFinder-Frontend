/* eslint-disable react/prop-types */
import React, { useState } from 'react';

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
    <div className="accordion" id="accordionExample">
      <div className="card">
        <div className="card-header" id="accordionHeading">
          <h2 className="mb-0">
            <button
              className="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target="#accordionCollapse"
              aria-expanded={activeIndex === null ? 'false' : 'true'}
              onClick={() => toggleAccordion(null)}
            >
              {title}
            </button>
          </h2>
        </div>
        <div
          id="accordionCollapse"
          className={`collapse ${activeIndex === null ? '' : 'show'}`}
          aria-labelledby="accordionHeading"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            {items.length === 0 && <p>No hay archivos</p>}
            {items.map((item, index) => (
              <div key={index}>
                <a href={item[0]} target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://img.freepik.com/iconos-gratis/pdf_318-187733.jpg"
                    className="link-card-icon"
                    alt="pdf icon"
                  />
                  Documento #{index + 1}
                </a>
                <h3>{item[1]}</h3>
                <p>{item[2]}</p>
                <p>Fecha: {item[3]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccordion;
