import React, { Fragment } from "react";
import ProductItem from "./ProductItem";
import PropTypes from "prop-types";

const Products = ({ products, saveRefreshProduct }) => {
  return (
    <Fragment>
      <h1 className="text-center"> Carta </h1>
      <ul className="list-group mt-5">
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            saveRefreshProduct={saveRefreshProduct}
          />
        ))}
      </ul>
    </Fragment>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  saveRefreshProduct: PropTypes.func.isRequired
};

export default Products;
