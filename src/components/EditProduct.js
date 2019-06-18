import React, { useState, useRef } from "react";
import Error from "./Error";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

const EditProduct = props => {
  const plateRef = useRef("");
  const priceRef = useRef("");

  const { product, history, saveRefreshProduct } = props;

  const [category, saveCategory] = useState("");
  const [error, saveError] = useState(false);
  const editProduct = async e => {
    e.preventDefault();
    const newPlate = plateRef.current.value;
    const newPrice = priceRef.current.value;

    if (newPlate === "" || newPrice === "") {
      saveError(true);
      return;
    }
    saveError(false);
    let newCategory = category === "" ? product.category : category;
    const newProduct = {
      plate: newPlate,
      price: newPrice,
      category: newCategory
    };
    const url = `http://localhost:3001/restaurant/${product.id}`;

    try {
      const resultado = await axios.put(url, newProduct);

      if (resultado.status === 200) {
        Swal.fire(
          "Producto Editado",
          "El producto se editó correctamente",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        type: "error",
        title: "Error",
        text: "Hubo un error, vuelve a intentarlo"
      });
    }

    saveRefreshProduct(true);
    history.push("/products");
  };
  const getValueRadio = e => {
    saveCategory(e.target.value);
  };
  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center"> Editar Producto </h1>
      {error ? <Error message="Todos los campos son obligatorios" /> : null}
      <form className="mt-5" onSubmit={editProduct}>
        <div className="form-group">
          <label> Plato </label>
          <input
            type="text"
            className="form-control"
            name="plate"
            placeholder="Nombre"
            ref={plateRef}
            defaultValue={product.plate}
          />
        </div>
        <div className="form-group">
          <label> Precio </label>
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Precio"
            ref={priceRef}
            defaultValue={product.price}
          />
        </div>
        <legend className="text-center"> Categoría: </legend>
        <div className="text-center">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="entrantes"
              onChange={getValueRadio}
              defaultChecked={product.category === "entrantes"}
            />
            <label className="form-check-label"> Entrantes </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="bebida"
              onChange={getValueRadio}
              defaultChecked={product.category === "bebida"}
            />
            <label className="form-check-label"> Bebida </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="carnes"
              onChange={getValueRadio}
              defaultChecked={product.category === "carnes"}
            />
            <label className="form-check-label"> Carnes </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="pescados"
              onChange={getValueRadio}
              defaultChecked={product.category === "pescados"}
            />
            <label className="form-check-label"> Pescados </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="ensalada"
              onChange={getValueRadio}
              defaultChecked={product.category === "ensalada"}
            />
            <label className="form-check-label"> Ensalada </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="postre"
              onChange={getValueRadio}
              defaultChecked={product.category === "postre"}
            />
            <label className="form-check-label"> Postre </label>
          </div>
        </div>
        <input
          type="submit"
          className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
          value="Editar Producto"
        />
      </form>
    </div>
  );
};

export default withRouter(EditProduct);
