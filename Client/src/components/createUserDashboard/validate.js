const validate = (state) => {
    const errors = {};
    
    const patronEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const patronPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/;
    const patronNumerico = /^[0-9]+(\.[0-9]+)?$/;
    
    if (!state.name)  errors.name = "Name is required";
    if (state.name.length >= 50) errors.name = "The name must be less than 50 characters"

    if (!state.lastname)  errors.lastname = "Lastname is required";
    if (state.lastname.length >= 50) errors.lastname = "The name must be less than 50 characters"

    if (state.phone && !patronNumerico.test(state.phone)) errors.phone = 'This field must be numeric'

    if(!state.email) errors.email = 'Field is required'
    if (state.email && !patronEmail.test(state.email)) errors.email = 'Enter an email address'
    if (state.email.length > 250){
      errors.email = 'Email must be least to 250 characters';
    }
   
    if(!state.password) errors.password = 'Field is required' 
    if (!patronPassword.test(state.password)) errors.password = 'Password must be between 6 and 20 characters, at least one digit, one lowercase and one uppercase'
    
    if  (state.passwordRep && (state.password !== state.passwordRep)) errors.passwordRep = 'Password must match' 
    
    return errors;
}

export default validate;