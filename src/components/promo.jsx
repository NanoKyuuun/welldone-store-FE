import React, { useState, useEffect } from 'react';
import './PromoSection.css';
import data from '../assets/dataPromo.json';

const PromoSection = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const resolveImagePath = (imageUrl) => {
      if (imageUrl.startsWith('http')) {
        return imageUrl; // Return the full URL as-is
      } else {
        return new URL(`../assets/${imageUrl}`, import.meta.url).href; // Resolve local images
      }
    };

    const updatedSections = data.sections.map((section) => ({
      ...section,
      buttons: section.buttons.map((button) => ({
        ...button,
        imageUrl: resolveImagePath(button.imageUrl),
      })),
    }));

    setSections(updatedSections);
  }, []);

  const [clickCounts, setClickCounts] = useState({});

  const handleClick = (title) => {
    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [title]: (prevCounts[title] || 0) + 1,
    }));
  };

  useEffect(() => {
    console.log('Button click counts:', clickCounts);
  }, [clickCounts]);

  return (
    <div className="promo-section-container">
      {sections.map((section, index) => (
        <div key={index} className={section.sectionTitle === 'PILIH PEMBAYARAN' ? 'payment-section-container' : ''}>
          <h2 className={`section-title ${section.sectionTitle === 'PILIH PEMBAYARAN' ? 'pilih-pembayaran-title' : ''}`}> {section.sectionTitle} </h2>
          <ul className={`button-list ${section.sectionTitle === 'PILIH PEMBAYARAN' ? 'payment-section' : ''}`}>
            {section.buttons.map((buttonData, idx) => (
              <li key={idx} className="button-item">
                <button 
                  onClick={() => handleClick(buttonData.buttonTitle)}
                  className={section.sectionTitle === 'PILIH PEMBAYARAN' ? 'payment-button' : ''}
                >
                  <img
                    src={buttonData.imageUrl}
                    alt={buttonData.buttonTitle}
                  />
                  <div>
                    <h3>{buttonData.buttonTitle}</h3>
                    <p>{buttonData.subtitle1}</p>
                    <p className="subtitle2">{buttonData.subtitle2}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
  
};

export default PromoSection;
