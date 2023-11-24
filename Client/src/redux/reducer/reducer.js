import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  GET_PRODUCT_NAME,
  GET_ALL_SELECTS
  CLEAN_PRODUCT_DETAIL,
} from "../actions/actionTypes";

const initialState = {
  allproducts: [],
  creatingProduct: false,
  newProduct: null,
  error: null,
  // productDetails: null,
  productDetails: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allproducts: [...action.payload],
      };

    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        creatingProduct: true,
        error: null,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        creatingProduct: false,
        newProduct: action.payload,
      };

    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        creatingProduct: false,
        error: action.payload,
      };

    case FETCH_PRODUCT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        productDetails: action.payload,
        error: null,
      };

    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        productDetails: null,
        error: action.payload,
      };
     
    case GET_PRODUCT_NAME:
      
          return {
            ...state,
            allproducts: [...action.payload],
      };


      case GET_ALL_SELECTS:
        return {
          ...state,
          selectFilter: action.payload,
        };
  
    case CLEAN_PRODUCT_DETAIL:
      return{
        ...state,
        productDetails: {}
      }

    default:
      return state;

  }
}

//nuevo