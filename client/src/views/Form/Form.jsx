import { useState } from "react";
import style from './Form.module.css'
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import axios from 'axios'


const Form = () => {
  const [form, setForm] = useState({
    name: "",
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    type: "",
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
    type: "",
    weight: '',
    image: "",
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
    } else if (property === 'type' && !/^[a-zA-Z ,.'-]+$/.test(value)) {
      setErrors({ ...errors, type: 'El type debe ser solo letras' });
    } else if (property === 'type' && value === '') {
      setErrors({ ...errors, type: 'Este campo es obligatorio' });
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
  
  const submitHandler = async (event) => {
    event.preventDefault();

    console.log('Form object', form);
    try {
      const response = await axios.post('http://localhost:3001/pokemon', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        // The request was successful (status code 201 - Created).
        alert('Success: Pokémon created successfully.');
      } else {
        // Handle unexpected responses.
        alert('Error: Unexpected response from the server.');
      }
    } catch (error) {
      // Handle errors, including network errors, server errors, and validation errors.
      if (error.response) {
        // The request was made and the server responded with a status code outside the range of 2xx.
        alert('Error: ' + error.response.data.message); // Use the specific error message from the server.
      } else if (error.request) {
        // The request was made but no response was received, or an error occurred when setting up the request.
        alert('Error: No response from the server. Check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an error.
        alert('Error: ' + error.message);
      }
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
        <input type="number" min="1" step="1" value={form.attack} onChange={changeHandler} name="attack" />
        {errors.attack && <span>{errors.attack}</span>}
      </div>
      <div>
        <label>DEF</label>
        <input type="number" min="1" step="1" value={form.defense} onChange={changeHandler} name="defense" />
        {errors.defense && <span>{errors.defense}</span>}
      </div>
      <div>
        <label>SPD</label>
        <input type="number" min="1" step="1" value={form.speed} onChange={changeHandler} name="speed" />
        {errors.speed && <span>{errors.speed}</span>}
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
      </div>
      <div>
         <select value={form.type} onChange={changeHandler} name="type">
           <option value="">Select a type</option>
           <option value="Normal">Normal</option>
           <option value="Fighting">Fighting</option>
           <option value="Flying">Flying</option>
           <option value="Poison">Poison</option>
           <option value="Ground">Ground</option>
           <option value="Rock">Rock</option>
           <option value="Bug">Bug</option>
           <option value="Ghost">Ghost</option>
           <option value="Steel">Steel</option>
           <option value="Fire">Fire</option>
           <option value="Water">Water</option>
           <option value="Grass">Grass</option>
           <option value="Electric">Electric</option>
           <option value="Psychic">Psychic</option>
           <option value="Ice">Ice</option>
           <option value="Dragon">Dragon</option>
           <option value="Dark">Dark</option>
           <option value="Fairy">Fairy</option>
           <option value="Unknown">Unknown</option>
           <option value="Shadow">Shadow</option>
         </select>
         {errors.type && <span>{errors.type}</span>}
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" value={form.image} onChange={changeHandler} name="image" />
          {errors.image && <span>{errors.image}</span>}
        </div>
      <SubmitButton onSubmit={submitHandler}/>
    </form>
  );
};

export default Form;
