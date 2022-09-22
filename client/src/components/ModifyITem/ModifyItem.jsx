import React, { Component } from "react";
import { connect } from "react-redux";
import { getStockbyID, searchNameProductID } from '../../redux/actions'
import { withRouter } from "react-router";

const SizesArray = ["XS", "S", "M", "L", "XL"]


export class ModifyItem extends Component {

  constructor() {
    let objeto = SizesArray.reduce((a, v) => ({ ...a, [v]: false }), {})
    super();
    this.state = {checket:objeto,stocks:{},name:"",image:"",price:""};
  }

  componentDidMount() {
    let Id = this.props.match.params.id;
    this.props.searchNameProductID(Id);
  }

  SelectSize(e) {
    let objeto= {...this.state ,checket:{...this.state.checket, [e.target.value]: e.target.checked}}
    if(e.target.checked==false){
      delete this.state.stocks[e.target.value];
    }
    this.setState(objeto);
  }

  ChangeStocks(e,elemento){
    let objeto= {...this.state ,stocks:{...this.state.stocks, [elemento]: e.target.value}}
    this.setState(objeto);
  }
  ChangeProp(valor,propiedad){
    let objeto= {...this.state ,[propiedad]:valor}
    this.setState(objeto);
  }


  render() {
    console.log(this.props.products)
    console.log(this.state)

    var Sizes = [];
    for (const property in this.state.checket) {
      if (this.state.checket[property])
        Sizes.push(property)
    }
    if(this.props.products!=undefined && this.props.products.length>0){
      if(this.state.name=="")
      this.ChangeProp(this.props.products[0].name,"name")
      if(this.state.price=="")
      this.ChangeProp(this.props.products[0].price,"price")
      if(this.state.image=="")
      this.ChangeProp(this.props.products[0].image,"image")
    }

    return (
      <div>
        <img src={`https://${this.state.image}`} alt="Not found"></img>
        <p>
          <label>Name</label>
          <input id={"Name"} name={"Name"} value={this.state.name}
                        onChange={(e) => this.ChangeProp(e.target.value,"name")} />
        </p>
        <p>
          <label>Image</label>
          <input  id={"Image"} name={"Image"} value={this.state.image}
                        onChange={(e) => this.ChangeProp(e.target.value,"image")} />
        </p>
        <p>
          <label>Price</label>
          <input type="number" id={"Price"} name={"Price"} value={this.state.price}
                        onChange={(e) => this.ChangeProp(e.target.value,"price")} />
        </p>
         <p>CHOOSE STOCKS AND ADD STOCKS</p>
        <nav>
          <ul>
            <label> Sizes</label>
            {
              SizesArray.map((elemento) => {
                return (
                  <li>
                    <p>
                      <input type="checkbox" id={elemento} name={elemento} value={elemento}
                        onChange={(e) => this.SelectSize(e)} />
                      <label for={elemento}> {elemento}</label>
                    </p>
                  </li>)
              })
            }
          </ul>
        </nav>
        <nav>
          <ul>
            {
              Sizes.map((elemento) => {
                return (
                  <li>
                    <p>
                      <label>Stocks {elemento}: </label>
                      <input type="number" min={1} id={`Select${elemento}`} name={elemento} 
                    onChange={(e) => this.ChangeStocks(e,elemento)} />
                    </p>
                  </li>)
              })
            }
          </ul>
        </nav>


      </div>
    );
  }
}
const ModifyItemWithRouter = withRouter(ModifyItem);

function mapStateToProps(state) {
  return {
    products: state.products,
    stock_by_ID: state.stock_by_ID,
  }
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
    searchNameProductID: (id) => dispatch(searchNameProductID(id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModifyItemWithRouter);
