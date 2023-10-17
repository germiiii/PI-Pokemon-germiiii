import React from 'react';
import style from './ProgressBar.module.css';

const ProgressBar = ({ value, name }) => {
  // Define a mapping of stat names to CSS styles
  const statStyles = {
    hp: {
      background: `linear-gradient(to right, #FF5733 ${value}%, #D8D8D8 ${value}%)`,
    },
    atk: {
      background: `linear-gradient(to right, #FF5733 ${value}%, #D8D8D8 ${value}%)`,
    },
    defense: {
      background: `linear-gradient(to right, #3399FF ${value}%, #D8D8D8 ${value}%)`,
    },
    spd: {
      background: `linear-gradient(to right, #33CC33 ${value}%, #D8D8D8 ${value}%)`,
    },
  };

  // Get the style based on the stat
  const fillStyle = statStyles[name] || {};

  return (
    <div className={style.progress}>
      <div className={style.fill} style={fillStyle}>
        <div className={style.label}>{value}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
