import React, { Component } from "react";
import { connect } from "react-redux";
import { getCalendar,ChangeReferenceInitial,ChangeReference} from '../../redux/actions'
import { withRouter } from "react-router";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pay from "../Pago/Pay";

export class ResumenPago extends Component {
  
  HistoryPushPaypal(){
    this.props.history.push("/payment")
  }
  render() {
    var total=0;
   let rows=this.props.carry.map((elemento) => {
     total+=(elemento.amount*elemento.details.price)
      return (
        {name:elemento.details.name,size:elemento.state.size,amount:elemento.amount,price:elemento.details.price,priceTotal:(elemento.amount*elemento.details.price)}
      )
     }
    )

    console.log(this.props.carry)
    return (
      <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">${row.price.toFixed(2)}</TableCell>
              <TableCell align="right">${row.priceTotal.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <p>TOTAL : {total}</p>
    <p>Do you want to pay in cash or by PayPal/Credit Card?</p>
    <button>Pay in cash </button>
     <Pay/>
    </div>
    );
  }
}

const ResumenPagoRouter = withRouter(ResumenPago);

function mapStateToProps(state) {
  return {
    carry:state.carryProducts
  }
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
  }
}



//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(ResumenPagoRouter);





