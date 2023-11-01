const validate = (property, value, errors, setErrors) => {
    const updatedErrors = { ...errors }; // Create a copy of the current errors
  
    if (property === 'hp') {
      if (!/^\d+$/.test(value) || parseInt(value) > 200) {
        updatedErrors.hp = 'HP must be a valid integer not exceeding 200';
      } else {
        updatedErrors.hp = '';
      }
    } else if (property === 'attack') {
      if (!/^\d+$/.test(value) || parseInt(value) > 200) {
        updatedErrors.attack = 'ATK must be a valid integer not exceeding 200';
      } else {
        updatedErrors.attack = '';
      }
    } else if (property === 'defense') {
      if (!/^\d+$/.test(value) || parseInt(value) > 200) {
        updatedErrors.defense = 'DEF must be a valid integer not exceeding 200';
      } else {
        updatedErrors.defense = '';
      }
    } else if (property === 'speed') {
      if (!/^\d+$/.test(value) || parseInt(value) > 200) {
        updatedErrors.speed = 'SPD must be a valid integer not exceeding 200';
      } else {
        updatedErrors.speed = '';
      }
    } else if (property === 'image') {
      if (value.length > 250) {
        updatedErrors.image = 'Image URL is too long (maximum 250 characters)';
      } else if (!/^https?:\/\/.+/i.test(value)) {
        updatedErrors.image = 'Invalid image URL';
      } else {
        // Clear the error message for the current field
        updatedErrors.image = '';
      }
    } else if (property === 'height' && !/^\d+$/.test(value)) {
      updatedErrors.height = 'Height must be an integer';
    } else if (property === 'weight' && !/^\d+$/.test(value)) {
      updatedErrors.weight = 'Weight must be an integer';
    } else if (property === 'name' && !/^[a-zA-Z ,.'-]+$/.test(value)) {
      updatedErrors.name = 'El nombre debe ser solo letras';
    } else if (property === 'name' && value === '') {
      updatedErrors.name = 'Este campo es obligatorio';
    } else if (property === 'types' && !/^[a-zA-Z ,.'-]+$/.test(value)) {
      updatedErrors.types = 'El types debe ser solo letras';
    } else if (property === 'types' && value === '') {
      updatedErrors.types = 'Este campo es obligatorio';
    } else {
      // Clear the error message for the current field
      updatedErrors[property] = '';
    }
  
    // Set the updated errors
    setErrors(updatedErrors);
  };
  
  export default validate
