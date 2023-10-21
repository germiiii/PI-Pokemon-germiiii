import React, { useEffect, useState } from 'react';
import style from './ProgressBar.module.css';

const ProgressBar = ({ value, name }) => {
  const [fillWidth, setFillWidth] = useState(0);

  useEffect(() => {
    // When the component mounts or 'value' changes, update 'fillWidth'
    setFillWidth(value);
  }, [value]);

  // Define a mapping of stat names to CSS styles
  const statStyles = {
    hp: {
      background: `linear-gradient(to right, #FF5733 ${fillWidth}%, #D8D8D8 ${fillWidth}%)`,
    },
    atk: {
      background: `linear-gradient(to right, #FF5733 ${fillWidth}%, #D8D8D8 ${fillWidth}%)`,
    },
    defense: {
      background: `linear-gradient(to right, #3399FF ${fillWidth}%, #D8D8D8 ${fillWidth}%)`,
    },
    spd: {
      background: `linear-gradient(to right, #33CC33 ${fillWidth}%, #D8D8D8 ${fillWidth}%)`,
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
