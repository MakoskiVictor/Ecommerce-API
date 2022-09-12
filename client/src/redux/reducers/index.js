import { act } from "react-dom/test-utils";
import {
   SEARCH_NAME, CHANGE_FILTER_GENDER, CHANGE_FILTER_CATEGORY,
   CHANGE_FILTER_BRAND, GET_CATEGORYS, CHANGE_FILTER_MAX, CHANGE_FILTER_MIN, CHANGE_FILTER_PRICE,
   CHANGE_PAGINATED_PRODUCTS, CHANGE_PAGINATED_PAGE, SEARCH_PRODUCT_ID, DELETE_DETAILS, CHANGE_FILTER_NAME,
   ADD_PRODUCT_CARRY, GET_STOCK_PRODUCT_BY_ID, DELETE_STOCK_ID, GET_STOCK_PRODUCT_BY_ID_TOTAL, CHANGE_PRODUCTS_CARRY
   , CHANGE_USER_LOGIN
} from "../actions";

import {CARRY_LOCALHOST,USER_ID} from "../../components/Globales";

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
   stock_by_ID: [],
   carryProductsStocks: [],
   carryProducts: ObtenerInicialProductsCarry(),
   user_login: ObtenerInicial_ID_Login(),
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
      case CHANGE_PRODUCTS_CARRY:
         console.log("Cambio aca ",action.payload)
         return {
            ...state,
            carryProducts: action.payload
         };
      case CHANGE_USER_LOGIN:
         Cambiar_ID_Login(action.payload)
         return {
            ...state,
            user_login: action.payload
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

function ObtenerInicialProductsCarry() {
   let Data = JSON.parse(localStorage.getItem(CARRY_LOCALHOST))
   var Numero = 0
   if (Data !== undefined && Data!==null && Data.length !== 0) {
      var cantidad = 0
      for (let index = 0; index < Data.length; index++) {
         const element = Data[index];
         cantidad += (Number.parseInt(element.amount));
      }
      Numero = cantidad
   }
   return Numero
}

function ObtenerInicial_ID_Login() {
   let Data = JSON.parse(localStorage.getItem(USER_ID))
   var Id_user = {id:false}
   if (Data !== undefined && Data!==null) {
     Id_user=Data
   }
   return Id_user
}

function Cambiar_ID_Login(Dato) {
    localStorage.setItem(USER_ID,JSON.stringify(Dato));
}