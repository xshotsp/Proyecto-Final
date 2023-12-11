const validate = (state) => {
    const errors = {};

    console.log(state)
    
    const patronNumerico = /^[0-9]+$/;
        
   
    if (state.name.length > 50) errors.name = 'Must be less than 50 characters';

    if (state.lastname.length > 50) errors.lastname = 'Must be less than 50 characters';
      
    if (state.phone && !patronNumerico.test(state.phone)) errors.phone = 'This field must be numeric'
    
  
    
    return errors;
}

export default validate;