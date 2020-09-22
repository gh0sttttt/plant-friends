import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'try searching for plants!'}
      </p>
      <div id="search" className='center'>
        <div className='pa4 br3 shadow-5 center form'>
          <input className='f4 pa2 w-70' type="tex" onChange={onInputChange} />
          <button
            className='w-30 grow f4 link ph3 pv2 white bg-black'
            onClick={onButtonSubmit}>search</button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;