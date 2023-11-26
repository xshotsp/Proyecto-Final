import axios from "axios";
import getFindSelects from "../../functions/getFindSelects";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_NAME,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  GET_ALL_SELECTS,
  GET_FILTROS

} from './actionTypes';

const URL = "http://localhost:3001"

// Acción para traer todos los productos
    export const getAllProducts = () => {
      return async (dispatch) => {
          try{
            const productsname = (await axios.get(`${URL}/product/all-products`)).data;
    
              return dispatch({
                  type: GET_ALL_PRODUCTS, 
                  payload: productsname
              });
          }catch (error) {
              throw error.response.data
          }
      };
    };

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

// Trae el producto por Nombre
export const getProductName = (name) => {
  return async (dispatch) => {
      try{
        const productsname = (await axios.get(`${URL}/product/name/${name}`)).data;
        console.log(productsname)
        //if (!productsname) throw new Error ('No se encuentra un producto que coincida con ese nombre')
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


export function getAllSelects() {
  return async function (dispatch) {
    const productsInfo = await getFindSelects();
    dispatch({
      type: GET_ALL_SELECTS,
      payload: productsInfo,
    });
  };
}


export const getFilters = (filtros) => {
  return async (dispatch) => {
    // Construye un objeto que solo incluye filtros que tienen un valor definido y no son nulos
    const filtrosValidos = Object.keys(filtros).reduce((acc, key) => {
      if (filtros[key] !== null && filtros[key] !== undefined) {
        acc[key] = filtros[key];
      }
      return acc;
    }, {});

    try {
      // Construye la cadena de consulta de la URL para filtros
      const queryString = new URLSearchParams(filtrosValidos).toString();

      const url = `${URL}/product/?${queryString}`;
      const response = await axios.get(url);

      console.log(response.data)
      dispatch({
        type: GET_FILTROS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error en la solicitud con filtros:', error);
    }
  };
};
