import React, { Component } from "react";
import { connect } from "react-redux";
import { getStockbyIDTotalFilterCarry,ChangeCarryProducts, createOrder} from "../../redux/actions";
import style from "./Carry.module.css";
import CarryCard from "./CarryCard.jsx";
import CARRY_LOCALHOST from "../Globales";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Carry extends Component {

  Number2Decimals(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  componentDidMount() {
    let Data=this.props.carryProducts;
    this.props.getStockbyIDTotalFilterCarry(Data);
  }

  DecreaseElementCarry(carryElements, index) {
    let array = Object.assign([], carryElements);
    let cantidad = (Number.parseInt(array[index].amount)) - 1;

    if (cantidad <= 0) {
      Swal.fire({
        title: "Do you want to remove the product?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          array.splice(index, 1);
          this.props.ChangeCarryProducts(array)
          Swal.fire("The product was removed!", "", "success");
        }
      });
    } else {
      array[index].amount = cantidad;
      this.props.ChangeCarryProducts(array)
    }
    return array;
  }

  IncreaseElementCarry(carryElements, index) {
    let array = Object.assign([], carryElements);

    let cantidad = (Number.parseInt(array[index].amount)) + 1;
    if (cantidad > array[index].state.stock) {
      Swal.fire({
        title: `There is no more stock for this product`,
        icon: "warning",
        button: "Ok",
      });
      array[index].amount = array[index].state.stock;
    } else {
      array[index].amount = cantidad;
    }
    return array;
  }

  DeleteElementCarry(carryElements, index) {
    let NewCarry = Object.assign([], carryElements);
    NewCarry.splice(index, 1);
    return NewCarry;
  }

  onDelete(index) {
    let Data=this.props.carryProducts;
    this.props.getStockbyIDTotalFilterCarry(Data);
    Data = this.DeleteElementCarry(Data, index);
    this.props.ChangeCarryProducts(Data)
    this.props.getStockbyIDTotalFilterCarry(Data);

    Swal.fire({
      position: "bottom-start",
      icon: "success",
      title: "Product removed ",
      showConfirmButton: false,
      timer: 1000,
    });
  }
  onDecrease(index) {
    let Data=this.props.carryProducts;
    this.props.getStockbyIDTotalFilterCarry(Data);
    Data = this.DecreaseElementCarry(Data, index);
  }

  onIncrease(index) {
    let Data=this.props.carryProducts;
    this.props.getStockbyIDTotalFilterCarry(Data);
    Data = this.IncreaseElementCarry(Data, index);
    this.props.ChangeCarryProducts(Data)
  }

  onContinueBuy() {
    let { actualiceBuy } = this.VerificarStocks();
    if(this.props.user_login==false || this.props.user_login.id==undefined || this.props.user_login.id==false){
      Swal.fire({
        title: `You must log in before buying`,
        icon: "info",
        button: "Ok",
      });
    }
    else{
      if (actualiceBuy) return
      //////////////////////////////////
      
      const sendOrderPP = {
        stocks: this.props.carryProducts.map((e) => {
          return {
            amount: e.amount,
            value: e.details.price,
            productId: e.id,
            image: e.details.image
          }
        }),
        userId: this.props.user_login.id,
      };
      console.log(sendOrderPP)

      this.props.createOrder(sendOrderPP)

      /////////////////////////////////////
      this.props.history.push("/payment");
    }
  }

  VerificarStocks() {
    let Stocks = this.props.carryProductsStocks;
    let Data=this.props.carryProducts;
    let Actualizar = false;
    let start = 0;
    let Total = 0;
    let actualizoBuy = false;
  
    //Metodo para iterar 2 arrays para encontrar el elemento del local Storage dentro del Stock y hacer verificaciones
    console.log(Stocks,"  ",Data)
    
    for (let index = 0; index < Stocks.length; index++) {
      const stock = Stocks[index];
      for (let index2 = start; index2 < Data.length; index2++) {
        console.log("entra 1")
        const datalocal = Data[index2];
        let monto=(Number.parseInt(datalocal.amount))
        /// Encontrar dentro Stock el mismo id del elemento del local storage
        console.log(datalocal.id,"  ",stock.productId,"  ",
        datalocal.state.size,"  ",stock.productSize)
        if (
          datalocal.id == stock.productId &&
          datalocal.state.size == stock.productSize
        ) {
          console.log("entra 2")
          /// Verificar si el stock ha sido cambiado y modificar el local storage
          if (stock.stock !== datalocal.state.stock) {
            Data[index2].state.stock = stock.stock;
            datalocal.state.stock = stock.stock;
            Actualizar = true;
          }
          /// Verificar si el stock es 0 y enviar mensaje al cliente
          if (datalocal.state.stock == 0) {
            Actualizar = true;
            actualizoBuy = true;
            Swal.fire({
              title: `Sorry product stock:${datalocal.details.name} has been sold out`,
              icon: "warning",
              button: "Ok",
            });
            Data[index2].amount = datalocal.state.stock;
            datalocal.amount = datalocal.state.stock;
          }
          /// Verificar si el stock es menor al monto del local storage por cambio (enviar mensaje al cliente)
          else if (datalocal.state.stock < monto) {
            Actualizar = true;
            actualizoBuy = true;
            Swal.fire({
              title: `The maximum stock of the product: ${datalocal.details.name}" is now ",${datalocal.state.stock}`,
              icon: "warning",
              button: "Ok",
            });
            Data[index2].amount = datalocal.state.stock;
            datalocal.amount = datalocal.state.stock;
          }
          //Sumar el total de la compra
          Total += (Number.parseInt(datalocal.amount)) * parseFloat(datalocal.details.price);

          //Metodo para hacer la iteracion mas rapida
          let elementoStart = Data[start];
          Data[start] = Data[index2];
          Data[index2] = elementoStart;
          break;
        }
      }
      start++;
    }
    // Si hubo cambio en el Stock, actualiza los elementos del local Storage, asi como su stock nuevo, o cantidad de productos
    // del mismo elemento
    if (Actualizar) { 
      this.props.ChangeCarryProducts(Data)
      this.setState({ carry: Data });
    }
    //retorna el precio total
    return { priceTotal: Total, actualiceBuy: actualizoBuy };
  }

  

  render() {
    let carryProducts = this.props.carryProducts;
    let { priceTotal } = this.VerificarStocks();
    let fraseNoResultados = "There are no products added to the shopping cart";
    console.log(this.props.carryProducts);

    return (
      <div className={style.mainContainer}>
        {carryProducts.length !== 0 ? (
          <div className={style.containCarry}>
            <div>
              {carryProducts?.map((c, index) => (
                <CarryCard
                  id={c.details.id}
                  img={c.details.image}
                  name={c.details.name}
                  brand={c.details.brand}
                  price={c.details.price}
                  size={c.state.size}
                  amount={c.amount}
                  onDecrease={() => this.onDecrease(index)}
                  onIncrease={() => this.onIncrease(index)}
                  onDelete={() => this.onDelete(index)}
                />
              ))}
            </div>
            <div className={style.PriceTotalGlobal}>
              <div className={style.PriceTotal}>
                <p>Total: ${this.Number2Decimals(priceTotal)}</p>
                <button
                  className={style.buttonPriceTotal}
                  onClick={() => this.onContinueBuy()}
                >
                  Continuar Compra
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cards">
            <p>
              <b>{fraseNoResultados}</b>
            </p>
          </div>
        )}
      </div>
    );
  }
}

const CarryWithRouter = withRouter(Carry);

function mapStateToProps(state) {
  return {
    carryProductsStocks: state.carryProductsStocks,
    carryProducts: state.carryProducts,
    user_login:state.user_login,
  };
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return {
      getStockbyIDTotalFilterCarry: (carry) => dispatch(getStockbyIDTotalFilterCarry(carry)),
      ChangeCarryProducts: (carrynew) => dispatch(ChangeCarryProducts(carrynew)),
      createOrder:(SendPP)=>dispatch(createOrder(SendPP)),
    //changePaginatedPage: (page) => dispatch(changePaginatedPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarryWithRouter);
