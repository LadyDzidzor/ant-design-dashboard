/**
 * Module for dashboard routes and navigation
 */

import React from "react";
import AddProduct from "../components/addproduct.component";
import AddProductVariation from "../components/addvariation.component";
import HomeComponent from "../components/dashboard.component";
import SingleOrder from "../components/order.component";
import Orders from "../components/orders.component";
import Products from "../components/products.component";
import UploadCSV from "../components/uploadCSV.component";
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
    main: UploadCSV,
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
    path: "/dashboard/orders/:id",
    main: SingleOrder,
    name: () => <>Order</>,
  },
  {
    path: "/dashboard/orders",
    main: Orders,
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
