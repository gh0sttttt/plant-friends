import React from 'react';
import './PlantCard.css';


const PlantCard = ({ common_name, family, image_url, genus, year, scientific_name, onHideCard }) => {
  return (
    <div className='center pt4' >
      <div>
        <div id="plantList" className="pa2">
          <div className="card">
            <img src={image_url} className="w-100 image" alt={common_name} />
            <h1>{common_name}</h1>
            <cite className="scientific_name">{scientific_name} - {year}</cite>
            <p className="family">Family-{family}</p>
            <p className="genus"> Genus-{genus} </p>
            <button
              onClick={onHideCard}>close</button>
          </div>
        </div>
      </div>
    </div >
  );

};

export default PlantCard;