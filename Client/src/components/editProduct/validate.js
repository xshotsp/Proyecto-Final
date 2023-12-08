const validate = (state, campo) => {
    const errors = {};
    
    const patronNumerico = /^[0-9]+(\.[0-9]+)?$/;
    
    if (campo === "name") {
        if (!state.name)  errors.name = "Name is required";
        if (state.name.length >= 100) errors.name = "The name must be less than 50 characters"
    }
    
    
    if (!state.image) errors.image = "Must include an image of the product" 
    

    if (campo === "price") {
        if (!state.price)  errors.price = "Price is required";
        if (state.price && !patronNumerico.test(state.price)) errors.price = "Must be a number"
        if (state.price <= 0) errors.price = "Must be greater than 0" 
    }
    
    if (campo === "quantity") {
        if (!state.quantity)  errors.quantity = "Quantity is required";
        if (state.quantity && !patronNumerico.test(state.quantity)) errors.quantity = "Must be a number"
        if (state.quantity <= 0) errors.quantity = "Must be greater than 0" 
    }

    if (!state.colour.length) errors.colour = "Color is required"
   


    
    return errors;
}

export default validate;