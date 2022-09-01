import { SEARCH_NAME, CHANGE_FILTER_GENDER, CHANGE_FILTER_CATEGORY, 
   CHANGE_FILTER_BRAND, GET_CATEGORYS, CHANGE_FILTER_MAX, CHANGE_FILTER_MIN,CHANGE_FILTER_PRICE } from "../actions";

const initialState = {
   products: [],
   categorys: [],
   filters: { nameProductSearched: "", filterGender: "Men", filterBrand: [], filterCategory: 0, min: 0, max: 2000, filterForPrice: false }
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case "value":
         break;
      case SEARCH_NAME:
         return {
            ...state,
            products: action.payload.products,
            filters: { ...state.filters, nameProductSearched: action.payload.nameProductSearched, filterBrand: [] }
         };
      case CHANGE_FILTER_GENDER:
         return {
            ...state,
            filters: { ...state.filters, filterGender: action.payload, filterBrand: [], filterCategory: 0 }
         };
      case CHANGE_FILTER_CATEGORY:
         return {
            ...state,
            filters: { ...state.filters, filterCategory: action.payload, filterBrand: [] }
         };
      case CHANGE_FILTER_BRAND:
         return {
            ...state,
            filters: { ...state.filters, filterBrand: AgregarDesagregarArray(state.filters.filterBrand, action) }
         };
      case GET_CATEGORYS:
         return {
            ...state,
            categorys: action.payload
         };
      case CHANGE_FILTER_MIN:
         if (action.payload < state.filters.max) {
            return {
               ...state,
               filters: { ...state.filters, min: action.payload }
            };
         }
         return state;
      case CHANGE_FILTER_MAX:
         if (action.payload > state.filters.min) {
            return {
               ...state,
               filters: { ...state.filters, max: action.payload }
            };
         }
         return state;
      case CHANGE_FILTER_PRICE:
         return {
            ...state,
            filters: { ...state.filters, filterForPrice:action.payload }
         };
      default:
         return state;
   }
};

export default rootReducer;

function AgregarDesagregarArray(elementos, action) {
   let element = elementos;
   if (action.payload.checked) {
      if (!element.includes(action.payload.filter))
         element.push(action.payload.filter)
   }
   else {
      if (element.includes(action.payload.filter))
         element = element.filter(e => e !== action.payload.filter)
   }
   return element;
}