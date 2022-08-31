import { SEARCH_NAME } from "../actions";

const initialState = {
   products: [],
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
      default:
         return state;
   }
};

export default rootReducer;
