import axios from "axios";

export const SEARCH_NAME = "SEARCH_NAME";
export const CHANGE_FILTER_GENDER = "CHANGE_FILTER_GENDER";
export const CHANGE_FILTER_CATEGORY = "CHANGE_FILTER_CATEGORY";
export const CHANGE_FILTER_BRAND = "CHANGE_FILTER_BRAND";
export const GET_CATEGORYS="GET_CATEGORYS";
export const CHANGE_FILTER_MIN="CHANGE_FILTER_MIN";
export const CHANGE_FILTER_MAX="CHANGE_FILTER_MAX";
export const CHANGE_FILTER_PRICE="CHANGE_FILTER_PRICE";



export function searchNameProduct(name) {
   return async function (dispatch) {
      try {
         var json = await axios.get(
            `http://localhost:3001/product/?name=${name}`
         );
         return dispatch({
            type: SEARCH_NAME,
            payload: {products:json.data,nameProductSearched:name}
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function getCategorys() {
   return async function (dispatch) {
      try {
         var json = await axios.get(
            `http://localhost:3001/category`
         );
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
            payload: {filter:event.value,checked:event.checked}
         });
      } catch (error) {
         console.log(error);
      }
   };
}


export function changeFilterMax(e) {
   return async function (dispatch) {
      try {
         let value=e.target.valueAsNumber;
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
      let value=e.target.valueAsNumber;
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

