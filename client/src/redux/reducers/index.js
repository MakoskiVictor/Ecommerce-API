import { SEARCH_NAME, CHANGE_FILTER_GENDER, CHANGE_FILTER_CATEGORY, CHANGE_FILTER_BRAND } from "../actions";

const initialState = {
   products: [],
   filters: { nameProductSearched: "", filterGender: "Men", filterBrand: [], filterCategory: [] }
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case "value":
         break;
      case SEARCH_NAME:
         return {
            ...state,
            products: action.payload.products,
            filters: { ...state.filters, nameProductSearched: action.payload.nameProductSearched }
         };
      case CHANGE_FILTER_GENDER:
         return {
            ...state,
            filters: { ...state.filters, filterGender: action.payload,filterBrand:[],filterCategory:[]}
         };
      case CHANGE_FILTER_CATEGORY:
         return {
            ...state,
            filters: { ...state.filters, filterCategory: AgregarDesagregarArray(state.filters.filterCategory,action)}
         };
      case CHANGE_FILTER_BRAND:
         return {
            ...state,
            filters: { ...state.filters, filterBrand: AgregarDesagregarArray(state.filters.filterBrand,action) }
         };

      default:
         return state;
   }
};

export default rootReducer;

function AgregarDesagregarArray(elementos,action){
  let element=elementos;
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