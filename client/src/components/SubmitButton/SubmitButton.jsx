import React from 'react';
import style from './SubmitButton.module.css';

const SubmitButton = () => {
  return (
    <input type="submit" value="Enviar" className={style.custombutton}/>
  );
};

export default SubmitButton;
