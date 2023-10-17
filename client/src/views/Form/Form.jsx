import { useState } from "react";
import style from './Form.module.css'
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import axios from 'axios'


const Form = () => {
  const [form, setForm] = useState({
    name: "",
    hp: '',
    atk: '',
    def: '',
    spd: '',
    height: '',
    type: "",
    weight: '',
  });

  const [errors, setErrors] = useState({
    name: "",
    hp: '',
    atk: '',
    def: '',
    spd: '',
    height: '',
    type: "",
    weight: '',
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    // Update the form
    setForm({ ...form, [property]: value });

    // Validate and update errors for the specific field
    validate(property, value);
  }

  const validate = (property, value) => {
    if (property === 'hp' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, hp: 'HP must be an integer' });
    } else if (property === 'atk' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, atk: 'ATK must be an integer' });
    } else if (property === 'def' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, def: 'DEF must be an integer' });
    } else if (property === 'spd' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, spd: 'SPD must be an integer' });
    } else if (property === 'height' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, height: 'Height must be an integer' });
    } else if (property === 'weight' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, weight: 'Weight must be an integer' });
    } else if (property === 'name' && !/^[a-zA-Z ,.'-]+$/.test(value)) {
      setErrors({ ...errors, name: 'El nombre debe ser solo letras' });
    } else if (property === 'name' && value === '') {
      setErrors({ ...errors, name: 'Este campo es obligatorio' });
    } else if (property === 'type' && !/^[a-zA-Z ,.'-]+$/.test(value)) {
      setErrors({ ...errors, type: 'El type debe ser solo letras' });
    } else if (property === 'type' && value === '') {
      setErrors({ ...errors, type: 'Este campo es obligatorio' });
    } else {
      // Clear the error message for the current field
      setErrors({ ...errors, [property]: '' });
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/pokemon/', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      alert('Success: ' + JSON.stringify(response.data));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <div>
        <label>Name</label>
        <input type="text" value={form.name} onChange={changeHandler} name="name" />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>HP</label>
        <input type="number" min="1" step="1" value={form.hp} onChange={changeHandler} name="hp" />
        {errors.hp && <span>{errors.hp}</span>}
      </div>
      <div>
        <label>ATK</label>
        <input type="number" min="1" step="1" value={form.atk} onChange={changeHandler} name="atk" />
        {errors.atk && <span>{errors.atk}</span>}
      </div>
      <div>
        <label>DEF</label>
        <input type="number" min="1" step="1" value={form.def} onChange={changeHandler} name="def" />
        {errors.def && <span>{errors.def}</span>}
      </div>
      <div>
        <label>SPD</label>
        <input type="number" min="1" step="1" value={form.spd} onChange={changeHandler} name="spd" />
        {errors.spd && <span>{errors.spd}</span>}
      </div>
      <div>
        <label>Height</label>
        <input type="number" min="1" step="1" value={form.height} onChange={changeHandler} name="height" />
        {errors.height && <span>{errors.height}</span>}
      </div>
      <div>
        <label>Weight</label>
        <input type="number" min="1" step="1" value={form.weight} onChange={changeHandler} name="weight" />
        {errors.weight && <span>{errors.weight}</span>}
      </div>
      <div>
        <label>Type</label>
        <input type="text" value={form.type} onChange={changeHandler} name="type" />
        {errors.type && <span>{errors.type}</span>}
      </div>
      <SubmitButton onSubmit={submitHandler}/>
    </form>
  );
};

export default Form;
