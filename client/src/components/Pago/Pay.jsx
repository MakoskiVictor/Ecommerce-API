// import React, { useState, useEffect, useContext } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import Swal from "sweetalert2";
// import axios from "axios";
// // import { CrearComentarioReview } from "./crearComentario";
// import { Link, useHistory } from "react-router-dom";
// // import { SendReview } from "./SendEmail";
// // import { givePoints, takePoints } from "./Points";
// // import { CartContext } from "../Cart/CartContext";
// // import { postHistory } from "./History";
// // import { use } from "../../../../api/src/routes";


// export default function Pay() {

//   const PATH = 'http://localhost:3001'

//   // const history = useHistory();


// //   const idUser = window.atob(localStorage.getItem('id'));

// //   const navigate = useNavigate();
// //   const username = window.atob(localStorage.getItem("username")); //julianpardeiro
//   let product = localStorage.getItem("cartProducts");
//   //   console.log("product: ", product);
  
//   //console.log(usePoints);


//     // descomentar
// //   let productJSON = JSON.parse(product);


//   // console.log("productJSON: ", productJSON);

// // descomentar

// //   let articulos = productJSON.map((e) => {
// //     return {
// //       name: e.name,
// //       description: e.category[0] + "-" + e.id,
// //       unit_amount: {
// //         currency_code: "USD",
// //         value: e.price + "", //aca
// //       },
// //       quantity: e.amount,
// //     };
// //   });
//   //console.log("puntos: ", points);

//   // descomentar
// //   let PrecioTotalArticulos =
// //     articulos[0].unit_amount.value * articulos[0].quantity;

// //   let multiplicacionEntreValueYQuantity = articulos.map((e) => {
// //     return e.unit_amount.value * e.quantity;
// //   });

// //   if (articulos.length > 1) {
// //     PrecioTotalArticulos = multiplicacionEntreValueYQuantity.reduce(
// //       (prev, current) => {
// //         return prev + current;
// //       }
// //     );
// //   }
//   const createOrder = (data, actions) => {
//     return actions.order.create({
//         purchase_units: [
//           {
//             amount: {
//               currency_code: "USD",
//               //descomentar
//                 //   value: PrecioTotalArticulos.toFixed(2),
//                 value:10
//             },
//           },
//         ],
//         application_context: {
//           shipping_preference: "NO_SHIPPING",
//         },
//       })
//       .then((orderId) => {
//         //console.log("createOrder-orderId: ", orderId);
//         return orderId;
//       });
//   };

//   const onApprove = (data, actions) => {
//     return actions.order.capture().then(async function (detalles) {
//       // en detalles esta todo lo que pasa en nuestro pago en un objeto
//     //   const arregloSoloId = detalles.purchase_units[0].items.map((e) => {
//     //     let id = e.description.split("-")[1];
//     //     return id;
//     //   });
//     //   const productsArray = detalles.purchase_units[0].items.map((e) => {
//     //     return { name: e.name, cant: e.quantity, price: e.unit_amount.value };
//     //   });
//     //   await postHistory(detalles.id,idUser,productsArray)
//     //   await SendReview(username, productsArray, detalles.id);
//     //   await CrearComentarioReview(username, arregloSoloId, detalles.id);
//       Swal.fire({
//         icon: "success",
//         title: "Payment Successful!",
//         html:
//           `Payer: ${detalles.payer.name.given_name} ${detalles.payer.name.surname}` +
//           "</br>" +
//           "</br>" +
//           /// descomentar
//           // `Amount paid: ${detalles.purchase_units[0].amount.value} USD` +
//           "</br>" +
//           "</br>" +
//           `Transaction number: ${detalles.id}`,
//         // text: `Transaction number: ${detalles.id}`,
//         // text: `Amount paid: ${detalles.purchase_units[0].amount.value}`
//         // footer: '<a href="">Why do I have this issue?</a>'
//       });

//       //descomentar
//       // let arregloObjetosIdQuantity = detalles.purchase_units[0].items.map(
//       //   (e) => {
//       //     let id = e.description.split("-")[1];
//       //     return { id: id, size:e.size, stock: e.quantity };
//       //   }
//       // );
//       // console.log("arregloObjetosIdQuantity: ", arregloObjetosIdQuantity);

//       let stockProducts = [ {
//       id:"07b1051d-663f-4023-bcc8-d13861dd4787",
//       stock:"10", 
//       size:"L" 
//     },
//     {
//       id:"4dd34920-1cea-4638-b6e6-eb67de312cb5",
//       stock:"10", 
//       size:"L" 
//     }
//   ]



//       await axios({
//         method: "put",
//         url: `${PATH}/stock/drop`,
//         data: stockProducts,
//         // headers: { "X-Requested-With": "XMLHttpRequest" },
//         // withCredentials: true,
//       })
//         .then((e) => e.data)
//         .catch((e) => console.log(e));
//       // history("/done");
//     });
//   };

//   //   {id: '6DX94897RC997852V', intent: 'CAPTURE', status: 'COMPLETED', purchase_units: Array(1), payer: {…}, …}
//   //   create_time: "2022-06-29T17:22:02Z"
//   //   id: "6DX94897RC997852V"
//   //   intent: "CAPTURE"
//   //   links: [{…}]
//   //   payer: {name: {…}, email_address: 'sb-471yzp17341676@personal.example.com', payer_id: '39FW54JMV78TL', address: {…}}
//   //   purchase_units: [{…}]
//   //   status: "COMPLETED"
//   //   update_time: "2022-06-29T17:22:20Z"

//   const res = window.innerWidth;

//   const style = {
//     layout: "vertical",
//     color: "gold",
//     shape: "rect",
//     label: "pay",
//   };

//   const onCancel = (data) => {
//     // en data hay un order id que es un objeto {orderID: '6V920429E17498936'}
//     // console.log(data);
//     Swal.fire({
//       icon: "error",
//       title: "Payment Cancelled",
//       text: "Your payment has been cancelled and will not be charged",
//       // footer: '<a href="">Why do I have this issue?</a>'
//     });
//   };

//   const onError = (error) => {
//     Swal.fire({
//       icon: "error",
//       title: "Payment Error",
//       text: "There has been an error in your payment and will not be charged",
//       // footer: '<a href="">Why do I have this issue?</a>'
//     });
//     console.log("Error: ", error);
//   };

//   return (
//     <div className="flex flex-col select-none">
//       <span className="bg-primary-200">
//       <Link to = "/">
//       <button className="ml-5 mt-5 rounded bg-primary-400 p-3 hover:bg-primary-300">Back to home</button>
//       </Link>
//       </span>
//       <div className="mb-5 bg-primary-200 w-full">
      
//         <h1 className=" flex flex-col text-center text-primary-400 font-Open text-[90px] tracking-tight font-extrabold ">
//           CIOCLOTHES
//         </h1>
//       </div>
//       <div className="w-full ">
//         <div
//           name="holi"
//           style={
//             res < 768
//               ? {
//                   width: "90%",
//                   height: "100%",
//                   margin: "0 auto",
//                 }
//               : {
//                   width: "500px",
//                   height: "100%",
//                   margin: "0 auto",
//                 }
//           }
//         >
//         <PayPalScriptProvider>
//             <PayPalButtons
//               createOrder={(data, actions) => createOrder(data, actions)}
//               onApprove={(data, actions) => onApprove(data, actions)}
//               onCancel={onCancel}
//               style={style}
//               onError={onError}
//             />
//         </PayPalScriptProvider>

//         </div>
//       </div>
//     </div>
//   );
// }