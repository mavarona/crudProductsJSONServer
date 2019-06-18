import React, { useState } from "react";
import Error from "./Error";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

const AddProduct = ({ history, saveRefreshProduct }) => {
  const [plate, savePlate] = useState("");
  const [price, savePrice] = useState("");
  const [category, saveCategory] = useState("");
  const [error, saveError] = useState(false);

  const getValueRadio = e => {
    saveCategory(e.target.value);
  };

  const addProduct = async e => {
    e.preventDefault();
    if (plate === "" || price === "" || category === "") {
      saveError(true);
      return;
    }
    saveError(false);
    try {
      const result = await axios.post("http://localhost:3001/restaurant", {
        plate,
        price,
        category
      });
      if (result.status === 201) {
        Swal.fire(
          "Producto Creado",
          "El producto se ha creado correctamente",
          "success"
        );
      }
    } catch (error) {
      Swal.fire({ type: "error", title: "Error", text: error });
    }
    saveRefreshProduct(true);
    history.push("/products");
  };

  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center"> Agregar Nuevo Producto </h1>
      {error ? <Error message="Todos los campos son obligatorios" /> : null}
      <form className="mt-5" onSubmit={addProduct}>
        <div className="form-group">
          <label> Plato </label>{" "}
          <input
            type="text"
            className="form-control"
            name="plate"
            placeholder="Plato"
            onChange={e => savePlate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label> Precio </label>{" "}
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Precio"
            onChange={e => savePrice(e.target.value)}
          />
        </div>
        <legend className="text-center"> Categoría: </legend>{" "}
        <div className="text-center">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="entrantes"
              onChange={getValueRadio}
            />
            <label className="form-check-label">Entrantes </label>{" "}
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="bebida"
              onChange={getValueRadio}
            />
            <label className="form-check-label">Bebida </label>{" "}
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="carnes"
              onChange={getValueRadio}
            />
            <label className="form-check-label">Carnes </label>{" "}
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="pescados"
              onChange={getValueRadio}
            />
            <label className="form-check-label">Pescados </label>{" "}
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="ensalada"
              onChange={getValueRadio}
            />
            <label className="form-check-label">Ensalada </label>{" "}
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value="postre"
              onChange={getValueRadio}
            />
            <label className="form-check-label">Postre </label>{" "}
          </div>
        </div>
        <input
          type="submit"
          className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
          value="Agregar Producto"
        />
      </form>
    </div>
  );
};

export default withRouter(AddProduct);
