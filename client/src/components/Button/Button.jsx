import React from 'react';
import styles from './Button.module.css'; // Import the CSS module

const Button = ({name}) => {
  return (
    <button className={styles.button}>{name}</button>
  );
};

export default Button;
