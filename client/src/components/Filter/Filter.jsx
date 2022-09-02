import React, { Component } from "react";
import { connect } from "react-redux";
import {
  searchNameProduct, changeFilterGender, changeFilterCategory, changeFilterBrand,
  getCategorys, changeFilterMin, changeFilterMax, changeFilterPrice, changePaginatedProducts
} from '../../redux/actions'
//import style from "./Filter.module.css"

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

  obtenerMarcas(Brands, productosNuevos) {
    for (let index = 0; index < productosNuevos.length; index++) {
      const element = productosNuevos[index].brand;
      if (!Brands.includes(element))
        Brands.push(element);
    }
    return Brands
  }

  filtradoProductos(products, paginated, categorys, filterGender, filterBrand, filterCategory, filterForPrice, min, max) {

    let productosNuevos = products.filter(element => element.gender === filterGender);
    let IDsGender = categorys.filter(element => filterGender === element.gender);
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
    const { nameProductSearched, filterGender, filterBrand, filterCategory, filterForPrice, min, max } = this.props.filters;
    const { categorys, products, paginated } = this.props;
    let values = this.filtradoProductos(products, paginated, categorys, filterGender, filterBrand, filterCategory, filterForPrice, min, max)

    return (
      <div>
        <nav className="menuFiltrado">
          <ul className="menuFiltrado">
            <li className="ItemFiltrado">
              <label className="labelFiltrado" >Buscar Nombre Producto: </label>
              <input
                type="text"
                id="nombreProducto"
                autoComplete="off"
                value={nameProductSearched}
                onChange={(e) => this.handleChange(e)}
              />
            </li>

            <li className="ItemFiltrado">
              <p><label className="labelFiltrado" >Gender: </label>
                <select value={filterGender} onChange={(e) => this.props.changeFilterGender(e.target.value)}>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select></p>
            </li>

            <li className="ItemFiltrado">
              <p><label className="labelFiltrado" >Category: </label>
                <select value={this.props.filterCategory} onChange={(e) => this.props.changeFilterCategory(e.target.value)}>
                  {values.IDsGender.map((elemento) => {
                    return (
                      <option key={elemento.id} value={elemento.id}>{elemento.name}</option>)
                  })
                  }
                </select></p>
            </li>

            <li className="ItemFiltrado">
              <label className="labelFiltrado" > BrandName</label>
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
            <li className="ItemFiltrado">
              <input type="checkbox" id={"ActivateFilterPrice"} name={"ActivateFilterPrice"} value={"ActivateFilterPrice"} checked={filterForPrice}
                onChange={(e) => this.props.changeFilterPrice(e.target.checked)} />
              <label for={"ActivateFilterPrice"}> {"Filter for Price"}</label>
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
  }
}



//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(Filter);