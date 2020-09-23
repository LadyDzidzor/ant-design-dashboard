/**
 * Context for products
 */
import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import APICore from "../api.core";

const initialState = {
  products: [],
  loading: true,
  error: null,
};

// Create Context
export const ProductContext = createContext(initialState);

// Provider Component
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Action
  // Get Products
  const GetProducts = async () => {
    try {
      const response = await APICore(``, "GET");

      dispatch({
        type: "GET_PRODUCTS",
        payload: response.data,
      });
    } catch (error) {
      console.log(`This is the error:: ${error}`);
    }
  };

  // Add product
  const AddProduct = async (data) => {
    try {
      const response = await APICore(``, "POST", data);

      dispatch({
        type: "ADD_PRODUCTS",
        payload: response.data,
      });
    } catch (error) {
      console.log(`This is the error:: ${error}`);
    }
  };

  // Get single products
  const GetProduct = async (id) => {
    try {
      const response = await APICore(``, "GET");

      dispatch({
        type: "GET_PRODUCT",
        payload: response.data,
      });
    } catch (error) {
      console.log(`This is the error:: ${error}`);
    }
  };

  // Edit product
  const EditProduct = async (id) => {
    try {
      const response = await APICore(``, "PUT");

      dispatch({
        type: "EDIT_PRODUCT",
        payload: response.data,
      });
    } catch (error) {
      console.log(`This is the error:: ${error}`);
    }
  };

  // Delete product
  const DeleteProduct = async (id) => {
    try {
      const response = await APICore(``, "DELETE");

      dispatch({
        type: "DELETE_PRODUCT",
        payload: response.data,
      });
    } catch (error) {
      console.log(`This is the error:: ${error}`);
    }
  };

  return (
    <ProductProvider
      value={{
        loading: state.loading,
        error: state.error,
        products: state.products,
        GetProducts,
        GetProduct,
        AddProduct,
        EditProduct,
        DeleteProduct,
      }}
    >
      {children}
    </ProductProvider>
  );
};
