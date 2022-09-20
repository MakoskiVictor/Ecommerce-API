import { DataGrid, GridColDef, GridValueGetterParams, GridApi, GridCellValue } from '@mui/x-data-grid';
import React, { Component } from "react";
import { connect } from "react-redux";
import MenuItem from '@mui/material/MenuItem';
import { getOrders } from "../../redux/actions";
import Button from '@mui/material/Button';
import axios from 'axios';
import {Select } from '@mui/material';
import Swal from "sweetalert2";

function ActualiceOrder(funcionesDispatch:any): any {
  return async function (type: any, id: any, data: any) {
    try {
      console.log(type, id, data)
      let Datos = await axios({
        method: "put",
        url: `http://localhost:3001/orders/${id}?type=${type}`,
        data: { data: data },
      })
      funcionesDispatch.getOrders()
      return Datos.data;
    } catch (error) {
      console.log("Cargando o los productos no son los indicados");
    }
  }
}


function handleConfirmChange(e: any, params: any,funcionesDispatch:any) {
  let Promesa = ActualiceOrder(funcionesDispatch);  
  
  async function FunctionConfirmChange() {
    Swal.fire({
      title: "Do you want to change the status of the order?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Promesa("stateOrder", params.id, e.target.value)
      }
    });
  }
  FunctionConfirmChange();
}

function Colums(props: any): any {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'userId', headerName: 'UserID', width: 300 },
    { field: 'createdAt', headerName: 'Create', width: 150, type: "dateTime" },
    { field: 'price', headerName: 'Price', type: 'number', width: 70 },
    {
      field: 'action',
      headerName: 'Edit/Details',
      sortable: false,
       width: 110, 
      renderCell: (params) => {

        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          console.log(params)
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          console.log(thisRow)
          props.history.push(`/AdminDetailOrder/${thisRow.id}`);
        };

        return <Button onClick={onClick}>Click</Button>;
      },
    },
    {
      field: "stateOrder",
      editable: true,
      type: "singleSelect",
      sortable: false,
      width: 100, 
      renderCell: (params: any) => {
        return (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={params.row.stateOrder}
            label="Age"
            onChange={(e) => handleConfirmChange(e, params,props)}
          >
            <MenuItem value={"Creada"}>Creada</MenuItem>
            <MenuItem value={"Cancelada"}>Cancelada</MenuItem>
            <MenuItem value={"Despachada"}>Despachada</MenuItem>
          </Select>)
      }
    }
  ];

  return columns
}

type QuoteProps = {
  quotes: string,
  orders: [];
  getOrders: () => void;
}

type QuoteState = {
  currentIndex: string,
  option: string,
}

class AdminOrders extends Component<QuoteProps, QuoteState> {

  state: QuoteState = {
    currentIndex: "",
    option: "ID",
  };


  componentDidMount(): void {
    console.log(this.props.getOrders())
  }
  changeString = (e: any) => {
    this.setState(state => ({ currentIndex: e.target.value }))
  }

  changeOption = (e: any) => {
    this.setState(state => ({ ...this.state, option: e.target.value }))
  }


  render() {
    let ROW = this.props.orders.map((order: any, index) => {
      let Date_ = new Date(order.createdAt)
      return (
        { id: order.id, stateOrder: order.stateOrder, price: order.price, userId: order.userId, createdAt: Date_ }
      );
    })

    ROW = this.state.option == "ID_Order" ? ROW.filter(row => row.id.toLowerCase().startsWith(this.state.currentIndex.toLowerCase()))
      : ROW.filter(row => row.userId.toLowerCase().startsWith(this.state.currentIndex.toLowerCase()));

    console.log(this.props)

    return (
      <div>
        <p>
          <input
            type="text"
            id="nombreProducto"
            autoComplete="off"
            value={this.state.currentIndex}
            onChange={this.changeString}
          />
          <select value={this.state.option} onChange={this.changeOption}>
            <option key={"ID_Order"} value={"ID_Order"}>ID Order</option>
            <option key={"ID_User"} value={"ID_User"}>ID User</option>
          </select></p>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={ROW}
            columns={Colums(this.props)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    orders: state.orders,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getOrders: () => dispatch(getOrders()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);