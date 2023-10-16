import React from 'react';
import './ProgressComponent.css';

const ProgressComponent = () => {
  return (
    <div className="progress-component">
      <div className="progress-bar progress-bar-red"></div>
      <div className="progress-bar progress-bar-gray"></div>
      <div className="progress-bar progress-bar-purple"></div>
      <div className="progress-bar progress-bar-green"></div>
      <div className="progress-label">
        <span>50</span>
      </div>
    </div>
  );
};

export default ProgressComponent;
