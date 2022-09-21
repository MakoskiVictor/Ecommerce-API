import React, { Component } from "react";
import { connect } from "react-redux";
import { getCalendar,ChangeReferenceInitial,ChangeReference} from '../../redux/actions'
import { withRouter } from "react-router";

export class Formulario extends Component {
  
 componentDidMount(){
    this.props.ChangeReferenceInitial();
 }

 handleChange(e,type){
   this.props.ChangeReference(type,e.target.value)
 }

  render() {
   console.log(this.props.reference)
    return (
        <div>
        <label >Your Adress: </label>
              <input
                type="text"
                id="Direccion"
                autoComplete="off"
                value={this.props.reference.adress}
                onChange={(e) => this.handleChange(e,"adress")}
              />
         <label  >Your Phone </label>
              <input
                type="text"
                id="Phone"
                autoComplete="off"
                value={this.props.reference.phone}
                onChange={(e) => this.handleChange(e,"phone")}
              />
         <label  >Your Reference: </label>
              <input
                type="text"
                id="Reference"
                autoComplete="off"
                value={this.props.reference.reference}
                onChange={(e) => this.handleChange(e,"reference")}
              />  
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reference: state.reference,
  }
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
    getCalendar: () => dispatch(getCalendar()),
    ChangeReferenceInitial:()=>dispatch(ChangeReferenceInitial()),
    ChangeReference:(type,value)=>dispatch(ChangeReference(type,value))
  }
}



//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(Formulario);