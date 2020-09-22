import React from 'react';
import Tilt from 'react-tilt';
import tree from './bonzai.png';
import './logo.css';


const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt" options={{ max: 35 }}
        style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner"><img style={{ paddingTop: '15px' }} src={tree} alt='logo' />  </div>
      </Tilt>
    </div>
  );
};

export default Logo;