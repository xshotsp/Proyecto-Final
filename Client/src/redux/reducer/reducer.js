import {
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  GET_PRODUCT_NAME,
  GET_ALL_SELECTS,
  GET_FILTROS,
  GET_BRANDS,
  CLEAN_PRODUCT_DETAIL,
  TOGGLE_DARK_MODE,
  SET_ACCESS,
  USER_LOGGED_IN,
  GET_ALL_USERS,
  USER_LOG_OUT
  
} from "../actions/actionTypes";

const initialState = {
  allproducts: [],
  creatingProduct: true,
  newProduct: null,
  error: null,
  allBrands: [],
  productDetails: {},
  darkMode: false,
  allUsers:[],
  access:false,
  activeUser:{}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allproducts: [...action.payload],
      };

      case GET_PRODUCT_NAME:
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
     
          
    case GET_BRANDS: 
          return{
            ...state,
            allBrands: action.payload       //
      }


    case CLEAN_PRODUCT_DETAIL:
      return{
        ...state,
        productDetails: {}
      }

      case GET_ALL_SELECTS:
        return {
          ...state,
          selectFilter: action.payload,
        };
  
        case GET_FILTROS:
          return {
            ...state,
            allproducts: action.payload,
          };
        
          case TOGGLE_DARK_MODE:
            return {
              ...state,
              darkMode: !state.darkMode,
            };
            case SET_ACCESS:{
              return {
                ...state,
                access:action.payload
              }
            }
            case USER_LOGGED_IN:{
              return{
                ...state,
                activeUser:action.payload
              }
            }

            case GET_ALL_USERS :{
              return {...state,
                allUsers : action.payload}
            }

            case USER_LOG_OUT:{
              return{
                ...state,
                activeUser:{}
              }
            }

    default:
      return state;

  }
}
