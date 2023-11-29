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
  ADD_TO_CART,
  REMOVE_FROM_CART,
  MODIFY_QUANTITY,
} from "../actions/actionTypes";

const initialState = {
  allproducts: [],
  creatingProduct: true,
  newProduct: null,
  error: null,
  allBrands: [],
  // productDetails: null,
  productDetails: {},
  productsInCart:[],
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
          case ADD_TO_CART:
            return {
              ...state,
              productsInCart: [
                ...state.productsInCart,
                {
                  ...action.payload.product,
                  quantity: action.payload.quantity,
                },
              ],
            };
          

            case REMOVE_FROM_CART:
              return {
                ...state,
                productsInCart: state.productsInCart
                  ? state.productsInCart.filter(
                      (product) => product.id !== action.payload.productId
                    )
                  : [],
              };
            

    case MODIFY_QUANTITY:
      return {
        ...state,
        productsInCart: state.productsInCart.map((product) =>
          product.id === action.payload.productId
            ? { ...product, quantity: action.payload.newQuantity }
            : product
        ),
      };

    default:
      return state;

  }
}
