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
  USER_LOG_OUT,
  FINISH_PURCHASE,
  GET_PURCHASE_USER,
  GET_USER_CART,
  CLEAN_USER_CART,
  // reviews

  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
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
  activeUser:{},
  purchase: {},
  purchaseByUser: [],
  userCart: [],
  reviews: [],
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
      return {
        ...state,
        allBrands: action.payload, //
      };

    case CLEAN_PRODUCT_DETAIL:
      return {
        ...state,
        productDetails: {},
      };

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
    case SET_ACCESS: {
      return {
        ...state,
        access: action.payload,
      };
    }
    case USER_LOGGED_IN: {
      return {
        ...state,
        activeUser: action.payload,
      };
    }
    case USER_LOG_OUT: {
      return {
        ...state,
        activeUser: {},
      };
    }

    case GET_ALL_USERS: {
      return { ...state, allUsers: action.payload };
    }
    case GET_USER_CART: {
      return {
        ...state,
        userCart: action.payload,
      };
    }
    case CLEAN_USER_CART:{
      const emptyArr = []
      return{
        ...state,
        userCart: emptyArr
      }
    }

    case FINISH_PURCHASE: {
        return {
        ...state,
        purchase: action.payload
        }
    }

    case GET_PURCHASE_USER: {
          return {
            ...state,
            purchaseByUser: action.payload
          }
    }

    //reducer Review

    case FETCH_REVIEWS_REQUEST:
    case CREATE_REVIEW_REQUEST:
    case DELETE_REVIEW_REQUEST:
    case UPDATE_REVIEW_REQUEST:
      return { ...state };

    case FETCH_REVIEWS_SUCCESS:
    case CREATE_REVIEW_SUCCESS:
    case DELETE_REVIEW_SUCCESS:
    case UPDATE_REVIEW_SUCCESS:
      return { ...state, reviews: { ...state.reviews, ...action.payload } };


    case FETCH_REVIEWS_FAILURE:
    case CREATE_REVIEW_FAILURE:
    case DELETE_REVIEW_FAILURE:
    case UPDATE_REVIEW_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
