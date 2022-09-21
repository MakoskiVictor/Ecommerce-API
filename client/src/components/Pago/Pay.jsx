import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import axios from "axios";
import {Link, useHistory }from "react-router-dom";
import CARRY_LOCALHOST from "../Globales";
import styles from "./Pay.module.css";
import {History} from "./History"
import { DeleteDrop ,ChangeCarryProducts,createOrder} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Pay() {
  const dispatch = useDispatch();
  const carryProducts = useSelector((state) => state.carryProducts);

  const PATH = "http://localhost:3001";

  console.log(JSON.parse(localStorage.getItem(CARRY_LOCALHOST)));

  const history = useHistory();

  const user = useSelector(state=>state.user_login)

  let [arrProduc,setArrProduc] = useState([])
  let [arrPrecio,setArrPrecio] = useState(0)
  let product = localStorage.getItem(CARRY_LOCALHOST);

  let productJSON = JSON.parse(product);

  useEffect(()=>{

    let product = localStorage.getItem(CARRY_LOCALHOST);
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
    setArrProduc(articulos)
    console.log(articulos, "jajaja")
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
    setArrPrecio(PrecioTotalArticulos)
  }, [])

  
  const createOrderPaypal = (data, actions) => {
    console.log(actions,"soy actions")
    return actions.order
      .create({
        purchase_units: [
          {
            reference_id: "PUHF",
            description: "Sporting Goods",
            custom_id: "CUST-HighFashions",
            soft_descriptor: "HighFashions",
            amount: {
              currency_code: "USD",
              value: arrPrecio.toFixed(2),
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        return orderId;
      }).catch(error =>
        console.log(error)
        )
  };

  const onApprove = (data, actions) => {
    console.log(actions, "soy actions onApprove")
    return actions.order.capture().then(async function (detalles) {
      // en detalles esta todo lo que pasa en nuestro pago en un objeto
      // console.log(detalles.stocks)
      console.log(detalles, "soy detalles")

      // const productsArray = articulos.map((e) => {
      //   return { stock: e.stocks, userId: e.userId, price: e.price, idpurchase:e.idpurchase, creationdate:e.creationdate};
      // });
      // await History(detalles.stocks,detalles.purchase_units[0].amount.value,user.id,detalles.id, detalles.create_time)
      // console.log("history",detalles.purchase_units[0].amount.value,user.id,detalles.id, detalles.create_time)
      console.log("")
            const sendOrderPP = {
        price: arrPrecio.toFixed(2),
        stocks: productJSON.map((e) => {
          return {
            amount: e.amount,
            value: e.price,
            productId: e.productId,
            //  moreinfo: {
            //    product: e.product,
            //    destination: e.destination,
            //    departureHour: e.departureHour,
            //    arrivalHour: e.arrivalHour
            //  }
          }
        }),
        userId: user.id,
        idpurchase: detalles.id,
        creationdate: detalles.create_time,
      };

      dispatch(createOrder(sendOrderPP));
      console.log(createOrder("hola soy sendOrder",sendOrderPP))
      
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
      });
      
      let arregloObjetosIdQuantity = productJSON.map((e) => {
        return {size: e.size, stock: e.quantity };
      });
      const arr = [];
      
      for (let i = 0; i < productJSON.length; i++) {
        arr.push({
          id: productJSON[i].details.id,
          stock: productJSON[i].amount,
          size: productJSON[i].state.size,
        });
      }
      dispatch(DeleteDrop(arr));


      let stockProducts = arregloObjetosIdQuantity;

      await axios({
        method: "put",
        url: `${PATH}/stock/drop`,
        data: stockProducts,
      })
        .then((e)=>e.data,dispatch(ChangeCarryProducts([])))
        .catch((e) => console.log(e));
        setTimeout(() => {
          history.replace("/orders");
        }, 2000);
        
  }).catch(error =>
    console.log(error)
    )
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
    history.push("/");
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Payment Error",
      text: "There has been an error in your payment and will not be charged",
    });
    console.log("Error: ", error);
    history.push("/");
  };

  return (
    <div className="">
      {/*<div className="">
        <h1 className={styles.title}>CIOCLOTHES</h1>
  </div>

      <br />
      <br />
      */}
      <PayPalScriptProvider>
        <PayPalButtons
          createOrder={(data, actions) => createOrderPaypal(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
          onCancel={onCancel}
          onError={onError}
        />
      </PayPalScriptProvider>
      <a href="/">
        <button className={styles.btnBack}>Back to home</button>
      </a>
    </div>
  );
}
