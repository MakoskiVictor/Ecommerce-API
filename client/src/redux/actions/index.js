import axios from "axios";

export const SEARCH_NAME = "SEARCH_NAME";
export const CHANGE_FILTER_GENDER = "CHANGE_FILTER_GENDER";
export const CHANGE_FILTER_CATEGORY = "CHANGE_FILTER_CATEGORY";
export const CHANGE_FILTER_BRAND = "CHANGE_FILTER_BRAND";
export const GET_CATEGORYS = "GET_CATEGORYS";
export const CHANGE_FILTER_MIN = "CHANGE_FILTER_MIN";
export const CHANGE_FILTER_MAX = "CHANGE_FILTER_MAX";
export const CHANGE_FILTER_PRICE = "CHANGE_FILTER_PRICE";
export const CHANGE_PAGINATED_PRODUCTS = "CHANGE_PAGINATED_PRODUCTS";
export const CHANGE_PAGINATED_PAGE = "CHANGE_PAGINATED_PAGE";
export const SEARCH_PRODUCT_ID = "SEARCH_PRODUCT_ID";
export const DELETE_DETAILS = "DELETE_DETAILS";
export const CHANGE_FILTER_NAME = "CHANGE_FILTER_NAME";
export const ADD_PRODUCT_CARRY = "ADD_PRODUCT_CARRY";

export function searchNameProduct(name) {
   return async function (dispatch) {
      try {
         var json = await axios.get(
            `http://localhost:3001/product/?name=${name}`
         );
         return dispatch({
            type: SEARCH_NAME,
            payload: json.data,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function changeFilternameProductSearched(name) {
   return async function (dispatch) {
      try {
         return dispatch({
            type: CHANGE_FILTER_NAME,
            payload: name,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function searchProductId(id) {
   return function (dispatch) {
      fetch(`http://localhost:3001/product/${id}`)
         .then((response) => response.json())
         .then((product) => {
            dispatch({
               type: SEARCH_PRODUCT_ID,
               payload: product,
            });
         })
         .catch((error) => {
            console.log(error);
         });
   };
}

export function deleteDetails() {
   return {
      type: DELETE_DETAILS,
      payload: [],
   };
}

export function getCategorys() {
   return async function (dispatch) {
      try {
         var json = await axios.get(`http://localhost:3001/category`);
         return dispatch({
            type: GET_CATEGORYS,
            payload: json.data,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function changeFilterGender(gender) {
   return async function (dispatch) {
      try {
         return dispatch({
            type: CHANGE_FILTER_GENDER,
            payload: gender,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function changeFilterCategory(value) {
   return async function (dispatch) {
      try {
         return dispatch({
            type: CHANGE_FILTER_CATEGORY,
            payload: value,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function changeFilterBrand(event) {
   return async function (dispatch) {
      try {
         return dispatch({
            type: CHANGE_FILTER_BRAND,
            payload: { filter: event.value, checked: event.checked },
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function changeFilterMax(e) {
   return async function (dispatch) {
      try {
         let value = e.target.valueAsNumber;
         return dispatch({
            type: CHANGE_FILTER_MAX,
            payload: value,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function changeFilterMin(e) {
   return async function (dispatch) {
      let value = e.target.valueAsNumber;
      try {
         return dispatch({
            type: CHANGE_FILTER_MIN,
            payload: value,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function changeFilterPrice(checked) {
   return async function (dispatch) {
      try {
         return dispatch({
            type: CHANGE_FILTER_PRICE,
            payload: checked,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function changePaginatedProducts(nuevosProductos) {
   return async function (dispatch) {
      try {
         return dispatch({
            type: CHANGE_PAGINATED_PRODUCTS,
            payload: nuevosProductos,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function changePaginatedPage(newPage) {
   return async function (dispatch) {
      try {
         return dispatch({
            type: CHANGE_PAGINATED_PAGE,
            payload: newPage,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function addProductCarry(Size, idProduct) {
   return async function (dispatch) {
      try {
         return dispatch({
            type: ADD_PRODUCT_CARRY,
            payload: { size: Size, id: idProduct },
         });
      } catch (error) {
         console.log(error);
      }
   };
   console.log("Entra weewweew");
}

/* CREAR PRODUCTO */

export function CreateNewProduct(payload) {
   return async function () {
      const response = await axios.post(
         "http://localhost:3001/product/",
         payload
      );
      return response;
   };
}


