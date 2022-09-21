import React, { Component } from "react";
import { connect } from "react-redux";
import { getCalendar
} from '../../redux/actions'
import { withRouter } from "react-router";

export class FormularioContactoDelivery extends Component {
  

  constructor() {
    super();
    this.state = {Dia: undefined,Hour:undefined};
  }


 componentDidMount(){
    this.props.getCalendar();
 }

 changeDay(e){
  console.log(e)
  this.setState({...this.state,Dia: e.target.textContent});
 }

 changeHour(e){
  console.log(e)
  this.setState({...this.state,Hour: e.target.textContent});
 }

  render() {
   console.log(this.state.Dia)

   var today = new Date();
   var DaysMax=14

   var Nuevoarray=[]
   for (let index = 0; index < this.props.calendar.length; index++) {
    const DATE=new Date(this.props.calendar[index].date)
    if(DATE>today)
    Nuevoarray.push(this.props.calendar[index])
   }
   var result = today.setDate(today.getDate() + DaysMax);
   let result2=new Date(result)

   var Nuevoarray2=[]
   for (let index = 0; index < Nuevoarray.length; index++) {
    const DATE=new Date(Nuevoarray[index].date)
    if(DATE<result2)
    Nuevoarray2.push(Nuevoarray[index])
   }
   
   var Strings=[]
   for (let index = 0; index < Nuevoarray2.length; index++) {
    if(Strings.find(element => element ===Nuevoarray2[index].date)===undefined)
    Strings.push(Nuevoarray2[index].date)
   }
   console.log(Strings)
   console.log(Nuevoarray2)

   let NuevoArray3=Nuevoarray2.filter(element=>element.date===this.state.Dia)
   console.log(NuevoArray3)

    return (
        <div>
        { Strings.map((elemento) => {
            return (
              <label value={elemento} onClick={(e)=>this.changeDay(e)}>{elemento}</label>)
          })
        }
        {
          NuevoArray3.map((elemento) => {
            return (
              <label value={elemento.time} onClick={(e)=>this.changeHour(e)}>{elemento.time}</label>)
          })
        }
      </div>
    );
  }
}

const FilterFormularioContactoDelivery= withRouter(FormularioContactoDelivery);

function mapStateToProps(state) {
  return {
    calendar: state.calendar,
  }
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
    getCalendar: () => dispatch(getCalendar()),
  }
}



//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(FilterFormularioContactoDelivery);