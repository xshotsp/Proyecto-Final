const validate = (state) => {
    const errors = {};
    
    const patronEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    //const patronCharact = /^[A-Za-zÑñáéíóúü]+[- ]{0,1}[A-Za-zÑñáéíóúü]+$/;
    //const patronNumerico = /^[0-9]+$/;
    const patronPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/;
    
    
    if(!state.email) errors.email = 'Este campo es requerido'
    if (!patronEmail.test(state.email)) errors.email = 'Introduzca una dirección de correo'
    if (state.email.length > 250){
      errors.email = 'El email debe ser menor a 250 caracteres';
    }
   
    // if (!state.member) errors.member = 'Este campo es requerido'
    // if (state.member.length > 50){
    //   errors.member = 'Debe ser menor a 50 caracteres';
    // }
    

    if(!state.password) errors.password = 'Este campo es requerido' 
    if (!patronPassword.test(state.password)) errors.password = 'La contraseña debe tener entre 6 y 20 caracteres, al menos un dígito, una minúscula y una mayúscula'
    
    if(state.password !== state.passwordRep) errors.passwordRep = 'La contraseña no coincide' 
    
    return errors;
}

export default validate;