"use client";
import React from 'react';
import tpStyles from './home.module.css';

const partnersData = [
  { name: "westin", logoUrl: "/brand-logo/westin-hotels-resorts-logo.svg" },
  { name: "Emirates", logoUrl: "/brand-logo/emirates-airlines.svg" },
  { name: "Raddison", logoUrl: "/brand-logo/radisson-resorts.svg" },
  { name: "sheraton", logoUrl: "/brand-logo/sheraton-hotels-resorts-2.svg" },
  { name: "Marriott", logoUrl: "/brand-logo/marriott-hotels-resorts-suites.svg" },
  { name: "airbnb", logoUrl: "/brand-logo/airbnb.svg" },
  { name: "cafe-coffe-day", logoUrl: "/brand-logo/cafe-coffee-day.svg" },
  { name: "barista", logoUrl: "/brand-logo/barista.svg" },
  { name: "Air India", logoUrl: "/brand-logo/air-india-2.svg" },
  { name: "indigo", logoUrl: "/brand-logo/indigo-airlines-logo.svg" },
  { name: "qatar", logoUrl: "/brand-logo/qatar-airways-1.svg" },

];

const TrustedPartners = () => {
  const infinitePartners = [...partnersData, ...partnersData, ...partnersData];

  return (
    <section className={tpStyles.tpSection}>
      <div className="container">
        <div className={tpStyles.tpHeader}>
          <p className={tpStyles.tpTagline}>Trusted by brands that serve premium dry fruit experiences</p>
          <div className={tpStyles.tpLine}></div>
        </div>
      </div>

      <div className={tpStyles.marqueeContainer}>
        <div className={tpStyles.marqueeTrack}>
          {infinitePartners.map((partner, index) => (
            <div key={index} className={tpStyles.tpCard}>
                <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className={tpStyles.tpLogo} 
                    loading="lazy"
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
