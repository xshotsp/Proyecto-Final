import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductRequest, createProductSuccess, createProductFailure } from '../../redux/actions/actions';
import axios from 'axios';

const ProductForm = () => {
  const dispatch = useDispatch();
  const { creatingProduct, newProduct, error } = useSelector((state) => state);

  const [productData, setProductData] = useState({
    name: '',
    image: '',
    price: '',
    colour: '',
    additionalImage: [],
  });

  const [errors, setErrors] = useState({
    name: 'Data is required',
    image: '',
    price: 'Data is required',
    colour: 'Data is required',
    additionalImage: [],
  });

  const validate = (productData, name) =>{
    if(name ==="name"){
      if(productData.name === "")setErrors({...errors, name: "El nombre es requerido"})
      else if(productData.name.length >= 15) setErrors({...errors, name:""})
    }

  if(name==="image"){
    const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    if(regex.test(productData.image)){
      setErrors({...errors, image: ""})
    }else{
      setErrors({...errors, image: "La imagen debe ser una URL"})
    }
  }

  if(name === "price"){
    if(isNaN(parseInt(productData.price))) setErrors({...errors, price: "El dato debe ser un numero"})
    else if (productData.price < 100 || productData.price > 0){errors.price = "El valor debe ser de 0 a 100"}
  else setErrors({...errors, price: ""})
  }

  if(name === "colour"){
    if(!productData.colour.length) setErrors({...errors, colour:"Minimo un color requerido"})
    else setErrors({...errors, colour: ""})
  }
  }
  
  
    


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    //RE-RENDERIZADO
  validate({
    ...productData,
    [e.target.name]: e.target.value}, e.target.name)
    return
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createProductRequest());

    try {
      const response = await axios.post('http://localhost:3001/product', productData);
      const newProduct = response.data;

      dispatch(createProductSuccess(newProduct));
    } catch (error) {
      console.error('Error al crear el producto:', error.message);
      dispatch(createProductFailure(error.message));
    }
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={productData.name} onChange={handleChange} />
        </label>
        <span>{errors.name}</span>
        <br />
        <label>
          Imagen:
          <input type="text" name="image" value={productData.image} onChange={handleChange} />
        </label>
        <span>{errors.image}</span>
        <br />
        <label>
          Precio:
          <input type="text" name="price" value={productData.price} onChange={handleChange} />
        </label>
        <span>{errors.price}</span>
        <br />
        <label>
          Color:
          <input type="text" name="colour" value={productData.colour} onChange={handleChange} />
        </label>
        <span>{errors.colour}</span>
        <br />
        <label>
          Imagen Adicional:
          <input type="text" name="additionalImage" value={productData.additionalImage} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" disabled={creatingProduct}>
          Crear Producto
        </button>
      </form>

      {/* Mostrar el resultado de la creación */}
      {newProduct && <p>Producto creado con éxito: {newProduct.name}</p>}
      {error && <p>Error al crear el producto: {error}</p>}
    </div>
  );
};

export default ProductForm;
