import axios from "axios";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  GET_PRODUCT_NAME,
} from './actionTypes';

const URL = "http://localhost:3001"

export const getAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/product'); 
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de productos');
      }
  
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  };
  
  getAllProducts()
    .then(products => {
      console.log('Productos obtenidos:', products);
    })
    .catch(error => {
      console.error('Error al obtener productos:', error);
    });
  
// Acción para iniciar la creación del producto
export const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

// Acción para manejar el éxito de la creación del producto
export const createProductSuccess = (newProduct) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: newProduct,
});

// Acción para manejar el fallo en la creación del producto
export const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});


export const getProductName = (name) => {
  return async (dispatch) => {
      try{
        const productsname = (await axios.get(`${URL}/products/name/${name}`)).data;

          return dispatch({
              type: GET_PRODUCT_NAME, 
              payload: productsname
          });
      }catch (error) {
          throw error.response.data
      }
  };
};

