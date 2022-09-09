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
export const GET_STOCK_PRODUCT_BY_ID = "GET_STOCK_PRODUCT_BY_ID";
export const DELETE_STOCK_ID = "DELETE_STOCK_ID";
export const GET_STOCK_PRODUCT_BY_ID_TOTAL = "GET_STOCK_PRODUCT_BY_ID_TOTAL";

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
   return async function (dispatch) {
      try {
         var json = await axios.get(`http://localhost:3001/product/${id}`);
         return dispatch({
            type: SEARCH_PRODUCT_ID,
            payload: json.data,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function deleteDetails() {
   return {
      type: DELETE_DETAILS,
      payload: [],
   };
}

export function deleteStockbyID() {
   return {
      type: DELETE_STOCK_ID,
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

export function addProductCarry(Size, idProduct, quanty, detail) {
   return async function (dispatch) {
      try {
         return dispatch({
            type: ADD_PRODUCT_CARRY,
            payload: {
               size: Size,
               id: idProduct,
               amount: quanty,
               detail: detail,
            },
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function getStockbyID(id) {
   return async function (dispatch) {
      try {
         var json = await axios.get(`http://localhost:3001/stock/${id}`);
         return dispatch({
            type: GET_STOCK_PRODUCT_BY_ID,
            payload: json.data,
         });
      } catch (error) {
         console.log(error);
      }
   };
}

export function getStockbyIDTotal(carry) {
   return async function (dispatch) {
      try {
         let Stocks = [];
         for (let index = 0; index < carry.length; index++) {
            const element = carry[index];
            let json = await axios.get(
               `http://localhost:3001/stock/${element.id}`
            );
            let array = json.data;
            let elementoIndice = -1;
            for (let index = 0; index < array.length; index++) {
               const element2 = array[index];
               if (element2.productSize === element.state.size) {
                  elementoIndice = array[index];
                  break;
               }
            }
            if (elementoIndice !== -1) Stocks.push(elementoIndice);
         }
         return dispatch({
            type: GET_STOCK_PRODUCT_BY_ID_TOTAL,
            payload: Stocks,
         });
      } catch (error) {
         console.log(error);
      }
   };
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

//                 lOGIN FORMULARIO

// export function postLogin(user) {
//    return async (dispatch) => {
//       try {
//          // generamos el token conectando con el back
//          const token = await axios.post("http://localhost:3001/users", user);
//          // lo pasamos a json y lo guardamos en la consola en application local storage
//          if (token.data === "invalid") {
//             Swal.fire(
//                "Email o contraseña incorrectos",
//                "Recuerda activar tu cuenta si es la primera vez que inicias sesion",
//                "warning"
//             );
//          } else if (token.data) {
//             localStorage.setItem("token", JSON.stringify(token.data));
//          }
//          //desencryptamos el token
//          const data = jwtDecode(token.data);
//          // alojamos el id del usuario y los datos relevantes en el estado
//          return dispatch(setCurrentUser(data));
//       } catch (e) {
//          Swal.fire(
//             "Email o contraseña incorrectos",
//             "Recuerda activar tu cuenta si es la primera vez que inicias sesión",
//             "warning"
//          );
//       }
//    };
// }
