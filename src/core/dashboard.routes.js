/**
 * Module for dashboard routes and navigation
 */

import React from "react";
import AddProduct from "../components/addproduct.component";
import AddProductVariation from "../components/addvariation.component";
import HomeComponent from "../components/dashboard.component";
import Products from "../components/products.component";
import Variations from "../components/variation.component.";

const Routes = [
  {
    exact: true,
    path: "/dashboard",
    main: HomeComponent,
    name: () => <>Dashboard</>,
  },
  {
    path: "/dashboard/products",
    main: Products,
    name: () => <>Products</>,
  },
  {
    path: "/dashboard/add-product",
    main: AddProduct,
    name: () => <>Add Product</>,
  },
  {
    path: "/dashboard/upload-csv",
    main: () => (
      <>
        <h1>Upload CSV</h1>
      </>
    ),
    name: () => <>Upload CSV</>,
  },
  {
    path: "/dashboard/add-variations",
    main: AddProductVariation,
    name: () => <>Add Product Variations</>,
  },
  {
    path: "/dashboard/variations",
    main: Variations,
    name: () => <>Product Variations</>,
  },
  {
    path: "/dashboard/orders",
    main: () => (
      <>
        <h1>Orders</h1>
      </>
    ),
    name: () => <>Orders</>,
  },
  {
    path: "/dashboard/users",
    main: () => (
      <>
        <h1>Users</h1>
      </>
    ),
    name: () => <>Users</>,
  },
  {
    path: "/dashboard/report",
    main: () => (
      <>
        <h1>Reports</h1>
      </>
    ),
    name: () => <>Reports</>,
  },
];

export default Routes;
