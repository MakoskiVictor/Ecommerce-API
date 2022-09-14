import React, { Component } from "react";
import { connect } from "react-redux";
import ProductGestionCard from "./ProductGestionCard.jsx";
import { } from "../../redux/actions";
import axios from "axios";


class ProductCards extends Component {
 
  constructor(props) {
    super(props);
    this.state = { productsStocks: [] };
   }

  //componentDidMount(){
    //console.log(this.props.paginated.productsViewPage)
    //let Promesa=this.getStocks()
    //Promesa().then(e=>console.log(e))
  //} 

  /*getStocks(){
    return async function (productos) {
      try {
        let productos2=Object.assign([], productos);
        for (let index = 0; index < productos2.length; index++) {
          const element = productos2[index];
          let json = await axios.get(`http://localhost:3001/stock/${element.id}`);
          let array = json.data;
          productos2[index]={...productos2[index],Stocks:array}
        }
        return productos2
      } catch (error) {
        console.log("Cargando o los productos no son los indicados");
      }
   }
}*/
 
 
  render() {
    let productos = this.props.paginated.productsViewPage
    //let Promesa=this.getStocks()
    //Promesa(productos).then(e=>(JSON.stringify(this.state.productsStocks)!==JSON.stringify(e)?this.setState({productsStocks:e }):console.log("Actualizado Stock")))
    //console.log(this.state.productsStocks)

    let fraseNoResultados = "No results found";
    return (
      <div className={this.props.styleCards.cards}>
        {productos.length !== 0 ?
          productos.map((c) => (
            <ProductGestionCard
              key={c.id}
              id={c.id}
              img={c.image}
              name={c.name}
              brand={c.brand}
              price={c.price}
              gender={c.gender}
              SizeStocks={c.stocks}
              styleCard={this.props.styleCard}
            />
          )):
          <div className="cards">
            <p>
              <b>{fraseNoResultados}</b>
            </p>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    paginated: state.paginated,
  };
}


export default connect(mapStateToProps)(ProductCards);
