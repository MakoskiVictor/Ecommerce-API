import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCalendar,ChangeDeliveryInitial,ChangeDelivery
} from '../../redux/actions'
import { withRouter } from "react-router";

export class FormularioContactoDelivery extends Component {

  constructor() {
    super();
    this.state = { Dia: undefined, Hour: undefined ,adress:"",phone:"",reference:""};
  }

  componentDidMount() {
    this.props.getCalendar(1);
    this.props.ChangeDeliveryInitial();
  }

  changeDay(day) {
    this.setState({ ...this.state, Dia: day });
  }

  changeHour(hour) {
    this.setState({ ...this.state, Hour: hour });
  }

  handleChange(e,type){
    this.setState({ ...this.state, [type]: e.target.value });
  }

  Comprobaciones(){
 //Buscar Id
 const found = this.props.calendar.find(element => element.date==this.state.Dia && element.time==this.state.Hour)
 
 this.props.ChangeDelivery({idDate:found,adress:this.state.adress 
  ,phone:this.state.phone ,reference:this.state.reference})
   
  this.props.history.push("/MethodPay")
  }

  render() {
    console.log(this.state.Dia)
    console.log(this.props.calendar)

    var today = new Date();
    var DaysMax = 14
    var result = today.setDate(today.getDate() + DaysMax);
    let result2 = new Date(result)

    var Nuevoarray2 = []
    for (let index = 0; index < this.props.calendar.length; index++) {
      const DATE = new Date(this.props.calendar[index].date)
      if (DATE < result2)
        Nuevoarray2.push(this.props.calendar[index])
    }

    var Strings = []
    for (let index = 0; index < Nuevoarray2.length; index++) {
      if (Strings.find(element => element === Nuevoarray2[index].date) === undefined)
        Strings.push(Nuevoarray2[index].date)
    }
    console.log(Strings)
    console.log(Nuevoarray2)

    let NuevoArray3 = Nuevoarray2.filter(element => element.date === this.state.Dia)
    console.log(NuevoArray3)

    console.log(this.props.delivery)
    return (
      <div>
        <label >Your Adress: </label>
        <input
          type="text"
          id="Direccion"
          autoComplete="off"
          value={this.state.adress}
          onChange={(e) => this.handleChange(e, "adress")}
        />
        <label  >Your Phone </label>
        <input
          type="text"
          id="Phone"
          autoComplete="off"
          value={this.state.phone}
          onChange={(e) => this.handleChange(e, "phone")}
        />
        <label  >Your Reference: </label>
        <input
          type="text"
          id="Reference"
          autoComplete="off"
          value={this.state.reference}
          onChange={(e) => this.handleChange(e, "reference")}
        />

        <nav>
          <ul>
            {Strings.map((elemento) => {
              let valor = elemento.substring(5, elemento.length)
              return (
                <li
                  key={elemento}
                  className="day-item"
                  onClick={() =>
                    this.changeDay(elemento)
                  }
                >
                  {valor}
                </li>
              )
            })
            }
          </ul>
        </nav>
        {NuevoArray3 !== undefined && NuevoArray3.length > 0 ?
          <div>
            <nav>
              <ul>
                {
                  NuevoArray3.map((elemento) => {
                    return (
                      <li
                        key={elemento.time}
                        className="hour-item"
                        onClick={() =>
                          this.changeHour(elemento.time)
                        }
                      >
                        {elemento.time}
                      </li>
                    )
                  }
                  )
                }
              </ul>
            </nav>
            {this.state.Hour === undefined && <label>CHOOSE HOUR</label>}
          </div>
          :
          "CHOOSE DAY"
        }
      {this.state.Dia!==undefined && this.state.Hour!==undefined && this.state.phone!=="" 
      && this.state.reference!=="" && this.state.adress!=="" && 
      <button onClick={()=>this.Comprobaciones()}>CONTINUE BUY</button>}
      </div>
    );
  }
}

const FilterFormularioContactoDelivery = withRouter(FormularioContactoDelivery);

function mapStateToProps(state) {
  return {
    calendar: state.calendar,
    delivery: state.delivery,
  }
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
    getCalendar: (e) => dispatch(getCalendar(e)),
    ChangeDeliveryInitial:()=>dispatch(ChangeDeliveryInitial()),
    ChangeDelivery:(objectDelivery)=>dispatch(ChangeDelivery(objectDelivery))
  }
}



//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(FilterFormularioContactoDelivery);