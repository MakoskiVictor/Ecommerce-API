import axios from "axios";
import CARRY_LOCALHOST from "../../components/Globales";
import Swal from "sweetalert2";

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
export const CHANGE_USER_LOGIN = "CHANGE_USER_LOGIN";
export const CREATE_COMMENT = "CREATE_COMMENT";;
export const GET_COMMENTS = "GET_COMMENTS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const CHANGE_PRODUCTS_CARRY = "CHANGE_PRODUCTS_CARRY";
export const GET_ORDERS = "GET_ORDERS";
export const CHANGE_PRODUCTS_BY_PAGE="CHANGE_PRODUCTS_BY_PAGE";
export const DELETE_USERS = "DELETE_USERS";

export function searchNameProduct(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/product/?name=${name}`);
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

export function changePaginatedByPage(productsByPage) {
   return async function (dispatch) {
     try {
       return dispatch({
         type: CHANGE_PRODUCTS_BY_PAGE,
         payload: productsByPage,
       });
     } catch (error) {
       console.log(error);
     }
   };
 }

export function ChangeCarryProducts(CarryNew) {
   return async function (dispatch) {
      try {
         return dispatch({
            type: CHANGE_PRODUCTS_CARRY,
            payload: CarryNew,
         });
      } catch (error) {
         console.log(error);
      }
   }
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

export function getStockbyIDTotalFilterCarry(carry) {
  return async function (dispatch) {
    try {
      let Stocks = [];
      for (let index = 0; index < carry.length; index++) {
        const element = carry[index];
        let json = await axios.get(`http://localhost:3001/stock/${element.id}`);
        let array = json.data;
        let elementoIndice = -1;
        for (let index = 0; index < array.length; index++) {
          const element2 = array[index];
          console.log(element2.productSize, "  ", element.state.size);
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


export function DeleteDrop(payload) {
  return async function () {
    const response = await axios.put("http://localhost:3001/stock/drop", {
      stockProducts: payload,
    });
    return response;
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

export function getChecklogin(newLoggedUser) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/users/login/?email=${newLoggedUser.email}&password=${newLoggedUser.password}`
      );

      var Dato = json.data;
      if (Dato === false) {
        Dato = { id: false };
        failedLogin();
      }

      return dispatch({
        type: CHANGE_USER_LOGIN,
        payload: Dato,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function Logout() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_USER_LOGIN,
        payload: { id: false },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// login google

export function LoginGoogleUser(user) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_USER_LOGIN,
        payload: user,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

function failedLogin() {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "The email or password is not correct",
    showConfirmButton: false,
    timer: 1000,
  });
}


// Comments
export function createComment(payload) {
  console.log("este es el payload papi", payload);
  return function (dispatch) {
    axios
      .post("http://localhost:3001/comment", payload)
      .then((res) => {
        dispatch({
          type: CREATE_COMMENT,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function updateReview(payload) {
  //console.log("esto es el payload de revie",payload)

  return function (dispatch) {
    axios
      .put(`http://localhost:3001/comment`, payload)
      .then((res) => {
        console.log("todo tranqui");
        dispatch({
          type: "UPDATE_REVIEW",
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function getAllComments() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/comments")
      .then((res) => {
        dispatch({
          type: GET_COMMENTS,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function getOrders() {
  return function (dispatch) {
    axios.get("http://localhost:3001/orders").then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    });
  };
}

 //USERS ADMIN

 export function getAllUsers() {
    return function (dispatch) {
       axios.get("http://localhost:3001/users")
       .then((res) => {
          dispatch({
             type: GET_ALL_USERS,
             payload: res.data,
          })
       })
    }
 };

 export function deleteUsers() {
   return {
     type: DELETE_USERS,
     payload: []
   }
};
