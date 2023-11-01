import { useState } from "react";
import style from './Form.module.css'
import { useDispatch } from "react-redux";
import { createPokemon } from "../../redux/actions";
import validate from '../../utils/validation'

const Form = () => {
  
  
  
  const [form, setForm] = useState({
    name: "",
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    types: [],
    weight: '',
    image: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    types: '',
    weight: '',
    image: "",
  });
  
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    
    // Update the form
    setForm({ ...form, [property]: value });

    validate(property, value, errors, setErrors);
  }
  
  const Types = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
    'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon',
    'dark', 'fairy', 'unknown', 'shadow'
  ];
  
  const typeClickHandler = (selectedType) => {
    // Copy the current types and handle up to 2 types
    const newTypes = form.types.includes(selectedType)
    ? form.types.filter((types) => types !== selectedType)
    : form.types.length < 2
    ? [...form.types, selectedType]
    : form.types;
    
    setForm((prevForm) => ({
      ...prevForm,
      types: newTypes,
    }));
  };
  const dispatch = useDispatch();
  
  //console.log(form)
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('function',form)
    dispatch(createPokemon(form));
  };
  return (
    <form className={style.form} >
      <div className={style.inputContainer}>
      <div>
        <label>Name</label>
        <input type="text" value={form.name} onChange={changeHandler} name="name" className={style.inputFields}/>
        {errors.name && <span className={style.error}>{errors.name}</span>}
      </div>
      <div>
        <label>HP</label>
        <input type="number" min="1" step="1" value={form.hp} onChange={changeHandler} name="hp" className={style.inputFields}/>
        {errors.hp && <span className={style.error}>{errors.hp}</span>}
      </div>
      <div>
        <label>ATK</label>
        <input type="number" min="1" step="1" value={form.attack} onChange={changeHandler} name="attack" className={style.inputFields}/>
        {errors.attack && <span className={style.error}>{errors.attack}</span>}
      </div>
      <div>
        <label>DEF</label>
        <input type="number" min="1" step="1" value={form.defense} onChange={changeHandler} name="defense" className={style.inputFields}/>
        {errors.defense && <span className={style.error}>{errors.defense}</span>}
      </div>
      <div>
        <label>SPD</label>
        <input type="number" min="1" step="1" value={form.speed} onChange={changeHandler} name="speed" className={style.inputFields}/>
        {errors.speed && <span className={style.error}>{errors.speed}</span>}
      </div>
      <div>
        <label>Height</label>
        <input type="number" min="1" step="1" value={form.height} onChange={changeHandler} name="height" className={style.inputFields} />
        {errors.height && <span className={style.error}>{errors.height}</span>}
      </div>
      <div>
        <label>Weight</label>
        <input type="number" min="1" step="1" value={form.weight} onChange={changeHandler} name="weight" className={style.inputFields}/>
        {errors.weight && <span className={style.error}>{errors.weight}</span>}
      </div>
      <div>
        <label>Image URL</label>
        <input type="text" value={form.image} onChange={changeHandler} name="image" className={style.inputFields}/>
        {errors.image && <span className={style.error}>{errors.image}</span>}
      </div>
      </div>
      <div>
      </div>
      <div className={style.typecont}>
        <label>Type</label>
  <div className={style.typeGrid}>
    {Types.map((types) => (
      <button
        key={types}
        type="button" 
        className={`${style[types]} ${form.types.includes(types) ? style.selected : ''}`}
        onClick={() => typeClickHandler(types)}>
        {types}
      </button>
      ))}
        {errors.types && <span className={style.error}>{errors.types}</span>}
      </div>
      </div>
      {Object.values(errors).every((error) => !error) && form.types.length != 0 && (
      <div className={style.sendCont}>
      <button className={style.send} onClick={submitHandler}>Crear</button>
      </div>   
      )} 
    </form>
  );
};

export default Form;
