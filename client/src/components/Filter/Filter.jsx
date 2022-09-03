import React, { Component } from "react";
import { connect } from "react-redux";
import {
  searchNameProduct, changeFilterGender, changeFilterCategory, changeFilterBrand,
  getCategorys, changeFilterMin, changeFilterMax, changeFilterPrice, changePaginatedProducts,
  changeFilternameProductSearched,
} from '../../redux/actions'
import { withRouter } from "react-router";
import style from "./Filter.module.css"

export class Filter extends Component {

  componentDidMount() {
    this.props.searchNameProduct(this.props.filters.nameProductSearched)
    this.props.getCategorys()
  }

  handleChange(event) {
    event.preventDefault();
    this.props.changeFilternameProductSearched(event.target.value)
    this.props.searchNameProduct(event.target.value)
    this.props.getCategorys()
  }

  obtenerMarcas(Brands, productosNuevos) {
    for (let index = 0; index < productosNuevos.length; index++) {
      const element = productosNuevos[index].brand;
      if (!Brands.includes(element))
        Brands.push(element);
    }
    return Brands
  }

  filtradoProductos(products, paginated, categorys, filterBrand, filterCategory, filterForPrice, min, max,gender) {

    let productosNuevos = products.filter(element => element.gender === gender);
    let IDsGender = categorys.filter(element => gender === element.gender);
    let Brands = [];
    let ID_Category = (filterCategory === 0) ? (IDsGender.length > 0 ? (`${IDsGender[0].id}`) : 0) : filterCategory;
    productosNuevos = productosNuevos.filter(element => `${element.categoryId}` === ID_Category);
    Brands = this.obtenerMarcas(Brands, productosNuevos);

    if (filterBrand.length !== 0)
      productosNuevos = productosNuevos.filter(element => filterBrand.includes(element.brand));
    if (filterForPrice)
      productosNuevos = productosNuevos.filter(element => (min <= element.price && element.price <= max));
     //console.log(productosNuevos);

    if (JSON.stringify(paginated.productsView) !== JSON.stringify(productosNuevos))
      this.props.changePaginatedProducts(productosNuevos)
    

    return { Brands: Brands, IDsGender: IDsGender }
  }

  render() {
   console.log(document.getElementsByClassName(style.NameFilter).style);

    const { nameProductSearched, filterBrand,filterGender, filterCategory, filterForPrice, min, max } = this.props.filters;
    const { categorys, products, paginated } = this.props;
    let values = this.filtradoProductos(products, paginated, categorys, filterBrand, 
      filterCategory, filterForPrice, min, max,this.props.match.params.gender)
    if(filterGender!==this.props.match.params.gender)
    this.props.changeFilterGender(this.props.match.params.gender)

    return (
      <div>
        <nav className={style.NavFilter}>
          <ul className="menuFiltrado">
            <li className={style.ItemFilter}>
              <label className={style.NameFilter} >Buscar Nombre Producto: </label>
              <input
                type="text"
                id="nombreProducto"
                autoComplete="off"
                value={nameProductSearched}
                onChange={(e) => this.handleChange(e)}
              />
            </li>

            <li className={style.ItemFilter}>
              <p><label className={style.NameFilter}  >Category: </label>
                <select value={filterCategory} onChange={(e) => this.props.changeFilterCategory(e.target.value)}>
                  {values.IDsGender.map((elemento) => {
                    return (
                      <option key={elemento.id} value={elemento.id}>{elemento.name}</option>)
                  })
                  }
                </select></p>
            </li>

            <li className={style.ItemFilter}>
              <label className={style.NameFilter} > BrandName</label>
              {
                values.Brands.map((elemento) => {
                  return (
                    <div>
                      <input type="checkbox" id={elemento} name={elemento} value={elemento} checked={filterBrand.includes(elemento)}
                        onChange={(e) => this.props.changeFilterBrand(e.target)} />
                      <label for={elemento}> {elemento}</label>
                    </div>)
                })
              }
            </li>
            <li className={style.ItemFilter}>
              <input type="checkbox" id={"ActivateFilterPrice"} name={"ActivateFilterPrice"} value={"ActivateFilterPrice"} checked={filterForPrice}
                onChange={(e) => this.props.changeFilterPrice(e.target.checked)} />
              <label   className={style.NameFilter} for={"ActivateFilterPrice"}> {"Filter for Price"}</label>
              <input type="number" min="0" step="50" placeholder="Precio Minimo" value={min} onChange={(e) => this.props.changeFilterMin(e)} />
              <label >{" a "}</label>
              <input type="number" min="0" step="50" placeholder="Precio Maximo" value={max} onChange={(e) => this.props.changeFilterMax(e)} />
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
// Se usa esto para envolver el componente con withRouter que esta definido en la linea 7 para que pueda 
//sacar los parametros del url donde esta parado // Ya que es un componente tipo Clase, se debe de hacer esto a diferencia de 
//Component Funcional
const FilterWithRouter = withRouter(Filter);

function mapStateToProps(state) {
  return {
    products: state.products,
    categorys: state.categorys,
    filters: state.filters,
    paginated: state.paginated,
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
    changeFilterPrice: (e) => dispatch(changeFilterPrice(e)),
    changePaginatedProducts: (e) => dispatch(changePaginatedProducts(e)),
    changeFilternameProductSearched: (nameSearch)=> dispatch(changeFilternameProductSearched(nameSearch)),
  }
}



//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(FilterWithRouter);