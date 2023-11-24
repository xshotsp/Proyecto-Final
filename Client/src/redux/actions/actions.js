import axios from "axios";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,

  GET_PRODUCT_NAME,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  CLEAN_PRODUCT_DETAIL

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
        const productsname = (await axios.get(`${URL}/product/name/${name}`)).data;

          return dispatch({
              type: GET_PRODUCT_NAME, 
              payload: productsname
          });
      }catch (error) {
          throw error.response.data
      }
  };
};


export const fetchProductById = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/product/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el producto. Código de estado: ${response.status}`);
    }

    const productDetails = await response.json();

    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: productDetails });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message });
  }
};

export function cleanProductDetail() {
  return{
    type: CLEAN_PRODUCT_DETAIL
  }
}