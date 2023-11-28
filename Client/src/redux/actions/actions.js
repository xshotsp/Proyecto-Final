import axios from "axios";
import getFindSelects from "../../functions/getFindSelects";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  GET_PRODUCTS,
  GET_PRODUCT_NAME,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  GET_ALL_SELECTS,
  CLEAN_PRODUCT_DETAIL,
  GET_BRANDS,
  GET_FILTERS,
  GET_ALL_PRODUCTS,

} from './actionTypes';

const URL = "http://localhost:3001"

// export const getAllProducts = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/product'); 
//       if (!response.ok) {
//         throw new Error('No se pudo obtener la lista de productos');
//       }
  
//       const products = await response.json();
//       return products;
//     } catch (error) {
//       console.error('Error al obtener los productos:', error);
//       throw error;
//     }
//   };
  
//   getAllProducts()
//     .then(products => {
//       console.log('Productos obtenidos:', products);
//     })
//     .catch(error => {
//       console.error('Error al obtener productos:', error);
//     });

    export function getProducts(){      //
      return async function(dispatch){
          try {
              const response= await axios.get("http://localhost:3001/product/")
              dispatch({
                  type: GET_PRODUCTS,
                  payload: response.data
              })
          } catch (error) {
              console.log(error);
          }
      }
  }
  
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

  export function getBrands(){
    return async function(dispatch){
      try {
        const response = await axios.get("http://localhost:3001/brands")
        dispatch({
          type: GET_BRANDS,
          payload: response.data
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  //Funcion Post Independiente
export function postProduct(state){
  return async function(dispatch){
    try {
      await axios.post("http://localhost:3001/product", state)
      alert("Producto creado con exito")
    } catch (error) {
      console.log(error);
    }
  }
}

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
        type: GET_FILTERS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error en la solicitud con filtros:', error);
    }
  };
};
export function cleanProductDetail() {
  return{
    type: CLEAN_PRODUCT_DETAIL
  }
}