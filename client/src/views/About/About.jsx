import React from "react";
import { Link } from 'react-router-dom';
import style from "./About.module.css";

const About = () => {
  return (
    <div className={style.container}>
      <h1 className={style.logo}>About Me</h1>
      <p className={style.introduction}>
        Hola! mi nombre es German Torres, vivo en Argentina un poco y otro poco por el mundo.</p>
        <p className={style.introduction}>
            Ademas de gustarme programar, tambien soy Instructor de Ski y cronometrador de deporte invernales
      </p>
      <p className={style.introduction}>en el anio 2022 fui el lider de cronometros en los juegos nacionales Argentinos!</p>

        <p2 className={style.introduction}>Espero que esta pagina creada por mi sea de tu agrado y no esta de mas recordar que cualquier tipo de 
        feedback es mas que bienvenido </p2>
      <Link to='/home'>
        <button className={style.button}>Back to Home</button>
      </Link>
    </div>
  );
};

export default About;
