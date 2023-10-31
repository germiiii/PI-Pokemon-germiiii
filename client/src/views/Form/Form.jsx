import { useState } from "react";
import style from './Form.module.css'
import { useDispatch } from "react-redux";
import { createPokemon } from "../../redux/actions";
import PokemonType from "../../components/Type/Type";


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
    const {value} = event.target;
    
    // Update the form
    setForm({ ...form, [property]: value });
    
    // Validate and update errors for the specific field
    validate(property, value);
  }
  
  const validate = (property, value) => {
    if (property === 'hp' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, hp: 'HP must be an integer' });
    } else if (property === 'attack' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, attack: 'ATK must be an integer' });
    } else if (property === 'defense' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, defense: 'DEF must be an integer' });
    } else if (property === 'speed' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, speed: 'SPD must be an integer' });
    } else if (property === 'height' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, height: 'Height must be an integer' });
    } else if (property === 'weight' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, weight: 'Weight must be an integer' });
    } else if (property === 'name' && !/^[a-zA-Z ,.'-]+$/.test(value)) {
      setErrors({ ...errors, name: 'El nombre debe ser solo letras' });
    } else if (property === 'name' && value === '') {
      setErrors({ ...errors, name: 'Este campo es obligatorio' });
    } else if (property === 'types' && !/^[a-zA-Z ,.'-]+$/.test(value)) {
      setErrors({ ...errors, types: 'El types debe ser solo letras' });
    } else if (property === 'types' && value === '') {
      setErrors({ ...errors, types: 'Este campo es obligatorio' });
    }  else if (property === "image" && !isValidImageUrl(value)) {
      setErrors({ ...errors, image: "Invalid image URL" });
    } else {
      // Clear the error message for the current field
      setErrors({ ...errors, [property]: '' });
    }
  }
  
  const isValidImageUrl = (url) => {
    // Simple URL format validation, you can customize this as needed
    const urlPattern = /^https?:\/\/.+/i;
    return urlPattern.test(url);
  };
  
  
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
      <div className={style.sendCont}>
      <button className={style.send} onClick={submitHandler}>Crear</button>
      </div>    
    </form>
  );
};

export default Form;
