/* eslint-disable no-unused-vars */
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
  TOGGLE_DARK_MODE,
  GET_ALL_USERS,
  SET_ACCESS,
  USER_LOGGED_IN,
  USER_LOG_OUT,
  FINISH_PURCHASE,
  GET_PURCHASE_USER,
  GET_USER_CART,
  CLEAN_USER_CART,
  GET_ALL_PURCHASES,
} from "./actionTypes";

const URL = import.meta.env.VITE_URL
  


  



export function getProducts() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/product/`);
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Acción para traer todos los productos
export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const productsname = (await axios.get(`${URL}/product/all-products`))
        .data;
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: productsname,
      });
    } catch (error) {
      throw error.response.data;
    }
  };
};

export function getBrands() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/brands/`);
      dispatch({
        type: GET_BRANDS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Funcion Post Independiente
export function postProduct(state) {
  return async function (dispatch) {
    try {
      await axios.post(`${URL}/product`, state);
      alert("Product created successfully");
    } catch (error) {
      console.log(error);
    }
  };
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
    try {
      const productsname = (await fetch(`${URL}/product/name/${name}`)).data;

      //if (!productsname) throw new Error ('No se encuentra un producto que coincida con ese nombre')
      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: productsname,
      });
    } catch (error) {
      throw error.response.data;
    }
  };
};

export const fetchProductById = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${URL}/product/${id}`);
    if (!response.ok) {
      throw new Error(
        `Error al obtener el producto. Código de estado: ${response.status}`
      );
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

      dispatch({
        type: GET_FILTERS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error en la solicitud con filtros:", error);
    }
  };
};
export function cleanProductDetail() {
  return {
    type: CLEAN_PRODUCT_DETAIL,
  };
}

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

export const getAllUsersAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/user/all`);
      const withoutPass = data.map((user) => {
        const { email, name, lastname, profile_picture, phone, active } = user;
        return { email, name, lastname, profile_picture, phone, active };
      });

      dispatch({
        type: GET_ALL_USERS,
        payload: withoutPass,
      });
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
    }
  };
};


export const setAccess = (boolean) => {
  return {
    type: SET_ACCESS,
    payload: boolean,
  };
};

export const userLoggedIn = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/user/${user}`);

      return dispatch({
        type: USER_LOGGED_IN,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};



      
export function finishPurchase(objectPago) {

  return async function (dispatch) {
   
    try {
      const response = await axios.post(`${URL}/purchase`, objectPago);
      window.location.href = response.data.init_point;
      dispatch({
        type: FINISH_PURCHASE,
        payload: response.data
      });
    } catch (error) {
      console.error('Error in finishPurchase:', error);
    }
  };
}


export const getPurchaseByUser = (email) => {
  console.log(email)
  return async (dispatch) => {
    try {
      
      const { data } = await axios.get(`${URL}/purchase/${email}`);
      
      return dispatch({
        type: GET_PURCHASE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const userLogOut = () => {
  return {
    type: USER_LOG_OUT,
  };
};


export const userCart = (email) =>{
return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/cart/${email}`);

      return dispatch({
        type: GET_USER_CART,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const cleanUserCart =()=>{
  return {
    type: CLEAN_USER_CART,
  }
}

export const getAllPurchases = () => {
  return async (dispatch) => {
    try {
      const purchases = (await axios.get(`${URL}/purchases/all`)).data;

      console.log(purchases)
      return dispatch({
        type: GET_ALL_PURCHASES,
        payload: purchases,
      });
    } catch (error) {
      throw error.response.data;
    }
  };
};

