import React, { Component } from "react";
import { connect } from "react-redux";
import { searchNameProduct, changeFilterGender, changeFilterCategory, changeFilterBrand, getCategorys, changeFilterMin, changeFilterMax,changeFilterPrice } from '../../redux/actions'
//import style from "./Filter.module.css"
//import { Link } from 'react-router-dom';

//import Cards from './SubComponentes/Cards.jsx';
//import Paginacion from "./SubComponentes/Paginacion.js";

export class Filter extends Component {


  componentDidMount() {
    this.props.searchNameProduct(this.props.filters.nameProductSearched)
    this.props.getCategorys()
  }

  handleChange(event) {
    event.preventDefault();
    this.props.searchNameProduct(event.target.value)
    this.props.getCategorys()
  }


  /*obtenerproductosMostrarPagina(productosMostrar) {
    /*if(productosMostrar!==undefined){
      let Inicio=(this.props.page-1)*10;
      return productosMostrar.slice(Inicio, Inicio+10);
    }*/
    /*return [];
  }*/

  obtenerMarcas(Brands, productosNuevos) {
    for (let index = 0; index < productosNuevos.length; index++) {
      const element = productosNuevos[index].brand;
      if (!Brands.includes(element))
        Brands.push(element);
    }
    return Brands
  }

  /*Prueba(elemento) {
    console.log(elemento);
  }*/

  render() {
    const { nameProductSearched, filterGender, filterBrand, filterCategory,filterForPrice, min, max } = this.props.filters;
    const { categorys, products } = this.props;

    let productosNuevos = products.filter(element => element.gender === filterGender);
    let IDsGender = categorys.filter(element => filterGender == element.gender);
    let Brands = [];
    let ID_Category = (filterCategory === 0) ? (IDsGender.length > 0 ? (`${IDsGender[0].id}`) : 0) : filterCategory;
    productosNuevos = productosNuevos.filter(element => `${element.categoryId}` === ID_Category);
    Brands = this.obtenerMarcas(Brands, productosNuevos);
    if (filterBrand.length !== 0)
      productosNuevos = productosNuevos.filter(element => filterBrand.includes(element.brand));
    if(filterForPrice)
    productosNuevos = productosNuevos.filter(element => (min <= element.price && element.price <= max));
    console.log(productosNuevos);


    return (
      <div>
        <nav className="menuOpciones">
          <ul className="menuOpcionesUl">
            <li className="menu">
              <label className="label" >Buscar Nombre Producto: </label>
              <input
                type="text"
                id="nombreProducto"
                autoComplete="off"
                value={nameProductSearched}
                onChange={(e) => this.handleChange(e)}
              />
            </li>

            <li className="menu">
              <p><label className="label" >Gender: </label>
                <select value={filterGender} onChange={(e) => this.props.changeFilterGender(e.target.value)}>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select></p>
            </li>

            <li className="menu">
              <p><label className="label" >Category: </label>
                <select value={this.props.filterCategory} onChange={(e) => this.props.changeFilterCategory(e.target.value)}>
                  {IDsGender.map((elemento) => {
                    return (
                      <option key={elemento.id} value={elemento.id}>{elemento.name}</option>)
                  })
                  }
                </select></p>
            </li>

            <li className="menu">
              <label > BrandName</label>
              {
                Brands.map((elemento) => {
                  return (
                    <div>
                      <input type="checkbox" id={elemento} name={elemento} value={elemento} checked={filterBrand.includes(elemento)}
                        onChange={(e) => this.props.changeFilterBrand(e.target)} />
                      <label for={elemento}> {elemento}</label>
                    </div>)
                })
              }
            </li>
            <li className="menu">
              <input type="checkbox" id={"ActivateFilterPrice"} name={"ActivateFilterPrice"} value={"ActivateFilterPrice"} checked={filterForPrice}
                onChange={(e) => this.props.changeFilterPrice(e.target.checked)} />
              <label for={"ActivateFilterPrice"}> {"Filter for Price"}</label>
              <input type="number" min="0" step="50" placeholder="Precio Minimo" value={min} onChange={(e) => this.props.changeFilterMin(e)} />
              <label >{" a "}</label>
              <input type="number" min="0" step="50" placeholder="Precio Maximo" value={max} onChange={(e) => this.props.changeFilterMax(e)} />
            </li>


            {/*
        <li className="menu">
        <p><label className="label" htmlFor="nombreProducto">Actividad Turistica: </label>
          <select value={this.props.filtroActividadTuristica} onChange={(e)=>this.props.cambioFiltro(e,"filtroActividadTuristica")}>
        <option key="todas" value="Todas">Todas</option>
        { this.props.actividades.map((elemento) => { 
                 return(
                  <option key={elemento} value={elemento}>{elemento}</option>)
              }) 
        }
        </select></p>
        </li>

        <li className="menu">
        <p><label className="label" htmlFor="nombreProducto">Ordenar por: </label>
          <select value={this.props.filtroAlfPob} onChange={(e)=>this.props.cambioFiltro(e,"filtroAlfPob")}>
        <option value="Alfabético">Alfabético</option>
        <option value="Población">Población</option>
        </select></p>
        </li>
      
      <li className="menu">
        <p><label className="label" htmlFor="nombreProducto">Direcion Orden</label>
          <select value={this.props.filtroDireccion} onChange={(e)=>this.props.cambioFiltro(e,"filtroDireccion")}>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
       </select></p>
       </li>
       <li className="menu">
          <Link to="/activities">
          <button className='button-activies' >Add Activities</button>
        </Link>
        </li>*/}
          </ul>
        </nav>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    categorys: state.categorys,
    filters: state.filters,
  }
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
    searchNameProduct: (nameProduct) => dispatch(searchNameProduct(nameProduct)),
    changeFilterGender: (gender) => dispatch(changeFilterGender(gender)),
    changeFilterCategory: (category) => dispatch(changeFilterCategory(category)),
    changeFilterBrand: (brand) => dispatch(changeFilterBrand(brand)),
    getCategorys: () => dispatch(getCategorys()),
    changeFilterMin: (e) => dispatch(changeFilterMin(e)),
    changeFilterMax: (e) => dispatch(changeFilterMax(e)),
    changeFilterPrice:(e)=> dispatch(changeFilterPrice(e)),
  }
}



//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(Filter);