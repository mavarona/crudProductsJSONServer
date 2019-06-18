import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./components/Products";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";

function App() {
  const header = {
    title: "@copyright 2019",
    pathTitle: "/products",
    list: "Products",
    pathList: "/products",
    add: "Add Product",
    pathAdd: "/new-product"
  };

  const [products, saveProducts] = useState([]);
  const [refreshProducts, saveRefreshProduct] = useState(true);

  useEffect(() => {
    const fechtAPI = async () => {
      if (refreshProducts) {
        const result = await axios.get("http://localhost:3001/restaurant");
        saveProducts(result.data);
      }
      saveRefreshProduct(false);
    };
    fechtAPI();
  }, [refreshProducts]);

  return (
    <Router>
      <Header
        title={header.title}
        pathTitle={header.pathTitle}
        list={header.list}
        pathList={header.pathList}
        add={header.add}
        pathAdd={header.pathAdd}
      />
      <main className="container mt-5">
        <Switch>
          <Route
            exact
            path="/products"
            render={() => (
              <Products
                products={products}
                saveRefreshProduct={saveRefreshProduct}
              />
            )}
          />
          <Route
            exact
            path="/new-product"
            render={() => (
              <AddProduct saveRefreshProduct={saveRefreshProduct} />
            )}
          />
          <Route exact path="/products/:id" component={Product} />
          <Route
            exact
            path="/products/edit/:id"
            render={props => {
              const productId = parseInt(props.match.params.id);
              const product = products.filter(
                product => product.id === productId
              );
              return (
                <EditProduct
                  saveRefreshProduct={saveRefreshProduct}
                  product={product[0]}
                />
              );
            }}
          />
        </Switch>
      </main>
      <Footer data="@copyright" />
    </Router>
  );
}

export default App;
