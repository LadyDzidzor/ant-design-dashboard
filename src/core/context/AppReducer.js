export default (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case "GET_PRODUCT":
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product.id === action.payload.id
        ),
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.product],
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        loading: false,
        products: [...state.product, action.payload],
      };
    default:
      return state;
  }
};
