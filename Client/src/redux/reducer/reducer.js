import { GET_PRODUCTS } from "../actions/actionTypes";





const initialState = {
    allproducts:[],

};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return{
                ...state,
                allproducts:[...action.payload],
            }
    }
}