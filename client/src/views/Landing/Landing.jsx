import React from "react";
import style from "./Landing.module.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Landing = () => {
  return (
      <div className={style.container}>
      <h1 className={style.logo}>Pokedex</h1>
        <Link to='/home'>
      <button className={style.button}>Ingresar</button>
    </Link>
    </div>
  );
};

export default Landing;
