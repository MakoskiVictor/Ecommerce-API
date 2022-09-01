import React, { Component } from "react";
import { connect } from "react-redux";
import { searchNameProduct, changeFilterGender, changeFilterCategory, changeFilterBrand } from '../../redux/actions'
//import style from "./Filter.module.css"
//import { Link } from 'react-router-dom';

//import Cards from './SubComponentes/Cards.jsx';
//import Paginacion from "./SubComponentes/Paginacion.js";
const IDs = [{ id: 8799, category: "Dress" }, { id: 3630, category: "Jeans" }, { id: 9263, category: "Shorts" }, { id: 4169, category: "Tops" }
  , { id: 2641, category: "Coats & Jackets" }, { id: 4208, category: "Jeans" }, { id: 7078, category: "Shorts" }, { id: 3602, category: "Shirts" }
  , { id: 5668, category: "Jackets" }, { id: 14274, category: "Joggers" }]

export class Filter extends Component {


  componentDidMount() {
    this.props.searchNameProduct(this.props.filters.nameProductSearched)
  }

  handleChange(event) {
    event.preventDefault();
    this.props.searchNameProduct(event.target.value)
  }


  obtenerproductosMostrarPagina(productosMostrar) {
    /*if(productosMostrar!==undefined){
      let Inicio=(this.props.page-1)*10;
      return productosMostrar.slice(Inicio, Inicio+10);
    }*/
    return [];
  }

  obtenerMarcas(Brands, productosNuevos) {
    for (let index = 0; index < productosNuevos.length; index++) {
      const element = productosNuevos[index].brand;
      if (!Brands.includes(element))
        Brands.push(element);
    }
    return Brands
  }

  Prueba(elemento) {
    /*if(productosMostrar!==undefined){
      let Inicio=(this.props.page-1)*10;
      return productosMostrar.slice(Inicio, Inicio+10);
    }*/
    console.log(elemento);
  }
  /*
    filtradoDeContinente(productosMostrar){
      let arregloproductosMostrar=productosMostrar;
      if(this.props.filtroContinente!=="Todos")
      arregloproductosMostrar=productosMostrar.filter(countrie => countrie.continente==this.props.filtroContinente);
    return arregloproductosMostrar;
    }
  
    filtradoDeTurismo(productosMostrar){
      if(this.props.filtroActividadTuristica!=="Todas"){
        let arregloActividades=[];
        for (const iterator of productosMostrar) {
        for (const iterator2 of iterator.actividades) {
            if(iterator2===this.props.filtroActividadTuristica){
            arregloActividades.push(iterator);
            break
            }
          }
        }
        productosMostrar=arregloActividades
      }
     return productosMostrar
    }
  
    filtradoDePoblacionAlfabeto(productosMostrar){
      for (let index = 0; index < productosMostrar.length; index++) {
        let primerValor=productosMostrar[index];
        let indiceMenor=index;
        for (let index2 = index+1; index2 < productosMostrar.length; index2++) {
        let valor=(this.props.filtroAlfPob==="Alfabético"?productosMostrar[index2].nombre:productosMostrar[index2].poblacion);
        if((this.props.filtroAlfPob==="Alfabético"?productosMostrar[indiceMenor].nombre:productosMostrar[indiceMenor].poblacion)>valor)
          indiceMenor=index2  
        }
        productosMostrar[index]=productosMostrar[indiceMenor];
        productosMostrar[indiceMenor]=primerValor;
      } 
     return productosMostrar
    }
  
    filtradoDeDireccion(productosMostrar){
      if(this.props.filtroDireccion=="Descendente")
      productosMostrar.reverse();
      return productosMostrar;
    }
  */

  render() {
    //const { nombreProducto } = this.props;
    /*let productosMostrar=this.filtradoDeContinente(this.props.productosMostrar)
    productosMostrar=this.filtradoDeTurismo(productosMostrar)
    productosMostrar=this.filtradoDePoblacionAlfabeto(productosMostrar)
    productosMostrar=this.filtradoDeDireccion(productosMostrar)*/
    // const mostrarproductosMostrar=this.obtenerproductosMostrarPagina(this.props.productosMostrar);
    console.log(this.props.filters)
    const { nameProductSearched, filterGender,filterBrand,filterCategory} = this.props.filters;

    let productosNuevos = this.props.products.filter(element => element.gender === filterGender);
    let IDsGender = filterGender === "Women" ? IDs.slice(0, 5) : IDs.slice(5, IDs.length);
    let Brands = [];
    console.log(productosNuevos); 
    if(filterCategory.length!==0)
    productosNuevos = productosNuevos.filter(element => filterCategory.includes(`${element.categoryId}`));
    console.log(productosNuevos);
    Brands=this.obtenerMarcas(Brands,productosNuevos); 
    if(filterBrand.length!==0)
    productosNuevos = productosNuevos.filter(element => filterBrand.includes(element.brand));
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
              <label > Category</label>
              {
                IDsGender.map((elemento) => {
                  return (
                    <div>
                      <input type="checkbox" id={elemento.category} name={elemento.category} checked={filterCategory.includes(`${elemento.id}`)}
                        value={elemento.id} onChange={(e) => this.props.changeFilterCategory(e.target)} />
                      <label for={elemento.category}> {elemento.category}</label>
                    </div>)
                })
              }
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
    //page: state.page,

    filters: state.filters,
    //filtroContinente: state.filtroContinente,
    //filtroActividadTuristica:state.filtroActividadTuristica,
    //filtroAlfPob:state.filtroAlfPob,
    //filtroDireccion:state.filtroDireccion,
    //actividades:state.actividades,
    //cargado:state.cargado
  }
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
    searchNameProduct: (nameProduct) => dispatch(searchNameProduct(nameProduct)),
    changeFilterGender: (gender) => dispatch(changeFilterGender(gender)),
    changeFilterCategory: (category) => dispatch(changeFilterCategory(category)),
    changeFilterBrand: (brand) => dispatch(changeFilterBrand(brand)),
    //cambioFiltro:  (e,Filtro) => dispatch(cambioFiltro(e,Filtro)),
  }
}



//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(Filter);