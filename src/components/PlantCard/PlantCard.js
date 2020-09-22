import React from 'react';
import './PlantCard.css';


const PlantCard = ({ family, common_name, image_url, year, scientific_name, author, bibliography, onHideCard }) => {
  return (
    <div className='center pt4' >
      <div>
        <div id="plantList" className="pa2">
          <div className="card">
            <img src={image_url} className="w-100 image" alt={common_name} />
            <h1>{common_name}</h1>
            <cite className="scientific_name">{scientific_name} - {year}</cite>
            <p className="family">{family}</p>
            <p className="bib">{author}-{bibliography} </p>
            <cite className="citation">all data provided by: trefle.io</cite>
            <button
              onClick={onHideCard}>close</button>
          </div>
        </div>
      </div>
    </div >
  );

};

export default PlantCard;