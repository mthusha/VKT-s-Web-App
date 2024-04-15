import React from 'react';
import loading from './assets/loading.svg'
const LoadingSpinner = () => {
  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>
    <div style={{ margin: '0 0 0 0' }} className="loading-spinner">
      <img style={{ width: '200px', height: 'auto', borderRadius: '5px' }} src={loading} alt="Loading" />
    </div>
  </div>
  
  );
};

export default LoadingSpinner;
