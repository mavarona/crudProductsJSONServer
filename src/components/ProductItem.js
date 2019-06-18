import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductItem = ({ product, saveRefreshProduct }) => {
  const deleteProduct = id => {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "El producto eliminado no se puede recuperar",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar"
    }).then(async result => {
      if (result.value) {
        try {
          const url = `http://localhost:3001/restaurant/${id}`;
          const res = await axios.delete(url);
          if (res.status === 200) {
            Swal.fire("Eliminado!", "El Producto se ha eliminado", "success");
            // Consultar la api nuevamente
            saveRefreshProduct(true);
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            type: "error",
            title: "Error",
            text: "Hubo un error, vuelve a intentarlo"
          });
        }
      }
    });
  };
  return (
    <li
      data-category={product.category}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <p>
        {product.plate}
        <span className="font-weight-bold"> {product.price}€ </span>
      </p>
      <div>
        <Link
          to={`/products/edit/${product.id}`}
          className="btn btn-success mr-2"
        >
          Editar
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteProduct(product.id)}
        >
          Eliminar &times;
        </button>
      </div>
    </li>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  saveRefreshProduct: PropTypes.func.isRequired
};

export default ProductItem;
