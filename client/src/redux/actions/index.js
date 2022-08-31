import axios from "axios";

export const SEARCH_NAME = "SEARCH_NAME";

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
