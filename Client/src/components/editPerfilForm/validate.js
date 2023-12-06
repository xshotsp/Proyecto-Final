const validate = (state) => {
    const errors = {};
    
    const patronNumerico = /^[0-9]+$/;
        
   
    if (state.username.length > 50) errors.username = 'Debe ser menor a 50 caracteres';
      
    if (state.phone && !patronNumerico.test(state.phone)) errors.phone = 'Este campo debe ser numerico'
    
  
    
    return errors;
}

export default validate;