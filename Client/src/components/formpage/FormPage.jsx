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
    additionalImage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        <br />
        <label>
          Imagen:
          <input type="text" name="image" value={productData.image} onChange={handleChange} />
        </label>
        <br />
        <label>
          Precio:
          <input type="text" name="price" value={productData.price} onChange={handleChange} />
        </label>
        <br />
        <label>
          Color:
          <input type="text" name="colour" value={productData.colour} onChange={handleChange} />
        </label>
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
