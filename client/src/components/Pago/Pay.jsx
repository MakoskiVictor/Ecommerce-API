import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import axios from "axios";
import { /*Link, useHistory */ } from "react-router-dom";
import CARRY_LOCALHOST from "../Globales";

import { VerificarCambioCarrito, DeleteDrop } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";


export default function Pay() {
  const dispatch = useDispatch();
  const carryProducts = useSelector((state) => state.carryProducts);

  const PATH = 'http://localhost:3001'

  // const dispatch = useDispatch()

  console.log(JSON.parse(localStorage.getItem(CARRY_LOCALHOST)))


  // const history = useHistory();
  //   const idUser = window.atob(localStorage.getItem('id'));
  //   const navigate = useNavigate();
  //   const username = window.atob(localStorage.getItem("username")); //julianpardeiro

  let product = (localStorage.getItem(CARRY_LOCALHOST));
  let productJSON = JSON.parse(product);

  let articulos = productJSON.map((e) => {
    return {
      name: e.details.name,
      description: e.details.name + "-" + e.details.id,
      unit_amount: {
        currency_code: "USD",
        value: e.details.price + "", //aca
      },
      quantity: e.amount,

    };
  });

  let PrecioTotalArticulos = articulos[0].unit_amount.value * articulos[0].quantity;

  let multiplicacionEntreValueYQuantity = articulos.map((e) => {
    return e.unit_amount.value * e.quantity;
  });

  if (articulos.length > 1) {
    PrecioTotalArticulos = multiplicacionEntreValueYQuantity.reduce(
      (prev, current) => {
        return prev + current;
      }
    );
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          reference_id: "PUHF",
          description: "Sporting Goods",
          custom_id: "CUST-HighFashions",
          soft_descriptor: "HighFashions",
          amount: {
            currency_code: "USD",
            value: PrecioTotalArticulos.toFixed(2),
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    })
      .then((orderId) => {
        return orderId;
      });
  };


  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (detalles) {
      // en detalles esta todo lo que pasa en nuestro pago en un objeto
      // const arregloSoloId = detalles.purchase_units[0].items.map((e) => {
      //   let id = e.description.split("-")[1];
      //   return id;
      // });
      // const productsArray = detalles.purchase_units[0].items.map((e) => {
      //   return { name: e.name, cant: e.quantity, price: e.unit_amount.value };
      // });
      // await postHistory(detalles.id,idUser,productsArray)
      // await SendReview(username, productsArray, detalles.id);
      // await CrearComentarioReview(username, arregloSoloId, detalles.id);
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
      });

      const arr = [];
      for (let i = 0; i < productJSON.length; i++) {
        arr.push({ id: productJSON[i].details.id, stock: productJSON[i].amount, size: productJSON[i].state.size })
      }
      dispatch(DeleteDrop(arr))

      let arregloObjetosIdQuantity = articulos.map(
        (e) => {
          let id = e.description.split("-")[1];
          return { id: id, size: e.size, stock: e.quantity };
        }
      );

      let stockProducts = arregloObjetosIdQuantity;

      localStorage.setItem(CARRY_LOCALHOST, JSON.stringify([]))

      dispatch(VerificarCambioCarrito(carryProducts));

      await axios({
        method: "put",
        url: `${PATH}/stock/drop`,
        data: stockProducts,
      })
        .then((e) => e.data)
        .catch((e) => console.log(e));
      // history("/");
    });
  };

  //   {id: '6DX94897RC997852V', intent: 'CAPTURE', status: 'COMPLETED', purchase_units: Array(1), payer: {…}, …}
  //   create_time: "2022-06-29T17:22:02Z"
  //   id: "6DX94897RC997852V"
  //   intent: "CAPTURE"
  //   links: [{…}]
  //   payer: {name: {…}, email_address: 'sb-471yzp17341676@personal.example.com', payer_id: '39FW54JMV78TL', address: {…}}
  //   purchase_units: [{…}]
  //   status: "COMPLETED"
  //   update_time: "2022-06-29T17:22:20Z"


  const onCancel = (data) => {
    Swal.fire({
      icon: "error",
      title: "Payment Cancelled",
      text: "Your payment has been cancelled and will not be charged",
    });
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Payment Error",
      text: "There has been an error in your payment and will not be charged",
    });
    console.log("Error: ", error);
  };

  return (
    <div className="">
      <div className="">
        <h1 className="">
          CIOCLOTHES
        </h1>
      </div>

      <a href="/">
        <button className="">Back to home</button>
      </a>
      <br />
      <br />
      <PayPalScriptProvider>
        <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
          onCancel={onCancel}
          onError={onError}
        />
      </PayPalScriptProvider>

    </div>
  );
}