const validate = (state) => {
    const errors = {};

    console.log(state)
    
    const patronNumerico = /^[0-9]+$/;
        
   
    if (state.name.length > 50) errors.name = 'Debe ser menor a 50 caracteres';

    if (state.lastname.length > 50) errors.lastname = 'Debe ser menor a 50 caracteres';
      
    if (state.phone && !patronNumerico.test(state.phone)) errors.phone = 'Este campo debe ser numerico'
    
  
    
    return errors;
}

export default validate;