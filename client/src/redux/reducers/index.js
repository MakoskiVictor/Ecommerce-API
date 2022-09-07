import { act } from "react-dom/test-utils";
import {
   SEARCH_NAME, CHANGE_FILTER_GENDER, CHANGE_FILTER_CATEGORY,
   CHANGE_FILTER_BRAND, GET_CATEGORYS, CHANGE_FILTER_MAX, CHANGE_FILTER_MIN, CHANGE_FILTER_PRICE,
   CHANGE_PAGINATED_PRODUCTS, CHANGE_PAGINATED_PAGE, SEARCH_PRODUCT_ID, DELETE_DETAILS, CHANGE_FILTER_NAME,
   ADD_PRODUCT_CARRY, GET_STOCK_PRODUCT_BY_ID, DELETE_STOCK_ID, GET_STOCK_PRODUCT_BY_ID_TOTAL,
} from "../actions";

const PAGE_START = 1;

const initialState = {
   products: [],
   details: [],
   categorys: [],
   filters: {
      nameProductSearched: "", filterGender: "Men", filterBrand: [],
      filterCategory: 0, min: 0, max: 500, filterForPrice: false
   },
   paginated: { page: PAGE_START, productsView: [] },
   carryProducts: [],
   stock_by_ID: [],
   carryProductsStocks:[],
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case "value":
         break;
      case SEARCH_NAME:
         return {
            ...state,
            products: action.payload,
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
      case DELETE_STOCK_ID:
         return {
            ...state,
            stock_by_ID: action.payload
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
      case CHANGE_FILTER_NAME:
         return {
            ...state,
            filters: { ...state.filters, nameProductSearched: action.payload, filterBrand: [] },
            paginated: { ...state.paginated, page: PAGE_START }
         };
      case ADD_PRODUCT_CARRY:
         let ArrayCarry = AddOrModifyCarry(action.payload, state.carryProducts)
         return {
            ...state,
            carryProducts: ArrayCarry,
         };
      case GET_STOCK_PRODUCT_BY_ID:
         return {
            ...state,
            stock_by_ID: action.payload
         };
      case GET_STOCK_PRODUCT_BY_ID_TOTAL:
         return {
            ...state,
            carryProductsStocks: action.payload
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

function AddOrModifyCarry(carryAdd, carryProducts) {
   let array = carryProducts;
   let indice = (carryProducts.findIndex(carry => (carry.id === carryAdd.id && JSON.stringify(carry.size) === JSON.stringify(carryAdd.size))))
   if (indice == -1) {
      array.push({ id: carryAdd.id, size: carryAdd.size, amount: carryAdd.amount, details: carryAdd.detail })
   }
   else {
      let cantidad = array[indice].amount + carryAdd.amount;
      cantidad = cantidad > carryAdd.size.stock ? carryAdd.size.stock : cantidad;
      array[indice].amount = cantidad;
   }
   return array;
}

function DisminuirCantidad(carryProducts, index) {
   let array = Object.assign([], carryProducts);

   let cantidad = array[index].amount - 1;
   if (cantidad == 0) {
      array.splice(index, 1)
   }
   else {
      array[index].amount = cantidad;
   }
   return array;
}

function AumentarCantidad(carryProducts, index) {
   let array = Object.assign([], carryProducts);

   let cantidad = array[index].amount + 1;
   if (cantidad > array[index].size.stock) {
      array[index].amount = array[index].size.stock;
      console.log("No hay mas stock para aumentar")
   }
   else {
      array[index].amount = cantidad;
   }
   return array;
}