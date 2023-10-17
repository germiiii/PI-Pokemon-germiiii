import React from "react";
import styles from "./Type.module.css";

const typeColors = {
  normal: styles.normal,
  fighting: styles.fighting,
  flying: styles.flying,
  poison: styles.poison,
  ground: styles.ground,
  rock: styles.rock,
  bug: styles.bug,
  ghost: styles.ghost,
  steel: styles.steel,
  fire: styles.fire,
  water: styles.water,
  grass: styles.grass,
  electric: styles.electric,
  psychic: styles.psychic,
  ice: styles.ice,
  dragon: styles.dragon,
  dark: styles.dark,
  fairy: styles.fairy,
  unknown: styles.unknown,
  shadow: styles.shadow,
};

const PokemonType = ({ type }) => {
  const typeStyle = typeColors[type] || styles.default;
  return <span className={typeStyle}>{type}</span>;
};

export default PokemonType;
