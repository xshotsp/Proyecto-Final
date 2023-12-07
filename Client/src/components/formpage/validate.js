const validate = (state, campo) => {
    const errors = {};
    
    const patronNumerico = /^[0-9]+(\.[0-9]+)?$/;
    
    if (campo === "name") {
    if (!state.name)  errors.name = "El nombre es requerido";
    if (state.name.length >= 50) errors.name = "El nombre debe ser menor a 50 caracteres"
    }
    
    console.log(state.image)
    console.log(campo)
    if (!state.image) errors.image = "Debe incluir una imagen del producto" 
    

    if (campo === "price") {
    if (!state.price)  errors.price = "El precio es requerido";
    if (state.price && !patronNumerico.test(state.price)) errors.price = "El dato debe ser un numero"
    if (state.price < 0) errors.price = "El valor debe ser mayor a 0" 
    }
    

    if (!state.colour.length) errors.colour = "El color es requerido"
   
    
    if (!state.brands.length) errors.brands = "La marca es requerida";
          
    return errors;
}

export default validate;