import {
   SEARCH_NAME, CHANGE_FILTER_GENDER, CHANGE_FILTER_CATEGORY,
   CHANGE_FILTER_BRAND, GET_CATEGORYS, CHANGE_FILTER_MAX, CHANGE_FILTER_MIN, CHANGE_FILTER_PRICE,
   CHANGE_PAGINATED_PRODUCTS, CHANGE_PAGINATED_PAGE, SEARCH_PRODUCT_ID, DELETE_DETAILS
} from "../actions";

const PAGE_START = 1;

const initialState = {
   products: [],
   details: [],
   categorys: [],
   filters: {
      nameProductSearched: "", filterGender: "Men", filterBrand: [],
      filterCategory: 0, min: 0, max: 2000, filterForPrice: false
   },
   paginated: { page: PAGE_START, productsView: [] },
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case "value":
         break;
      case SEARCH_NAME:
         return {
            ...state,
            products: action.payload.products,
            filters: { ...state.filters, nameProductSearched: action.payload.nameProductSearched, filterBrand: [] },
            paginated: { ...state.paginated, page: PAGE_START }
         };
      case SEARCH_PRODUCT_ID:
         return {
            ...state,
            details: action.payload
         };
      case DELETE_DETAILS:
         return {
             ...state,
             details: action.payload
         };
      case GET_CATEGORYS:
         return {
            ...state,
            categorys: action.payload
         };
      case CHANGE_FILTER_GENDER:
         return {
            ...state,
            filters: { ...state.filters, filterGender: action.payload, filterBrand: [], filterCategory: 0 },
            paginated: { ...state.paginated, page: PAGE_START }
         };
      case CHANGE_FILTER_CATEGORY:
         return {
            ...state,
            filters: { ...state.filters, filterCategory: action.payload, filterBrand: [] },
            paginated: { ...state.paginated, page: PAGE_START }
         };
      case CHANGE_FILTER_BRAND:
         return {
            ...state,
            filters: { ...state.filters, filterBrand: AgregarDesagregarArray(state.filters.filterBrand, action) },
            paginated: { ...state.paginated, page: PAGE_START }
         };
      case CHANGE_FILTER_MIN:
         if (action.payload < state.filters.max) {
            return {
               ...state,
               filters: { ...state.filters, min: action.payload },
               paginated: { ...state.paginated, page: PAGE_START }
            };
         }
         return state;
      case CHANGE_FILTER_MAX:
         if (action.payload > state.filters.min) {
            return {
               ...state,
               filters: { ...state.filters, max: action.payload },
               paginated: { ...state.paginated, page: PAGE_START }
            };
         }
         return state;
      case CHANGE_FILTER_PRICE:
         return {
            ...state,
            filters: { ...state.filters, filterForPrice: action.payload },
            paginated: { ...state.paginated, page: PAGE_START }
         };
      case CHANGE_PAGINATED_PRODUCTS:
         return {
            ...state,
            paginated: { ...state.paginated, productsView: action.payload, page: PAGE_START }
         };
      case CHANGE_PAGINATED_PAGE:
         return {
            ...state,
            paginated: { ...state.paginated, page: action.payload }
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