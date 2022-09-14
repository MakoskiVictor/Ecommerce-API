import React, { Component } from "react";
import { connect } from "react-redux";
import { changePaginatedPage,changePaginatedByPage } from "../../redux/actions";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const SizeEnumeracionPaginado = 10;
const SizeEnumeracionCards_byPage = 10;
class Paginated extends Component {

  Actualizar() {
   let NumeracionMaximaPaginas=this.props.NumMaxPag==undefined?SizeEnumeracionPaginado:this.props.NumMaxPag;
   let NumeracionMaximoTarjetas=this.props.NumMaxPag==undefined?SizeEnumeracionCards_byPage:this.props.NumMaxPag;

    let IndiceFinal =
      Math.floor(this.props.paginated.productsView.length / NumeracionMaximoTarjetas) +
      (this.props.paginated.productsView.length % NumeracionMaximoTarjetas === 0 ? 0 : 1);
    let PaginaStart =
      this.props.paginated.page - Math.floor(NumeracionMaximaPaginas / 4) < 1
        ? 1
        : this.props.paginated.page - Math.floor(NumeracionMaximaPaginas / 2);
    PaginaStart =
      IndiceFinal - PaginaStart > NumeracionMaximaPaginas - 1
        ? PaginaStart
        : IndiceFinal - (NumeracionMaximaPaginas - 1);
    PaginaStart = PaginaStart < 1 ? 1 : PaginaStart;

    let IndicesArray = [];
    IndicesArray.push(1);
    let Longitud =
      IndiceFinal > NumeracionMaximaPaginas - 1
        ? NumeracionMaximaPaginas
        : IndiceFinal;
    for (let i = 1; i < Longitud; i++) {
      if (i !== Longitud - 1) IndicesArray.push(PaginaStart + i);
      else IndicesArray.push(IndiceFinal);
    }
    IndiceFinal=IndiceFinal==0?1:IndiceFinal;
  
    return {IndiceFinal: IndiceFinal,IndicesArray:IndicesArray};
  }

  changePage(page, IndiceFinal) {
    if (page > 0 && page <= IndiceFinal) this.props.changePaginatedPage(page);
    this.props.changePaginatedByPage(this.obtenerCountriesPagina(this.props.paginated.productsView))
  }

  obtenerCountriesPagina(productos) {
    let NumeracionMaximoTarjetas=this.props.NumMaxPag==undefined?SizeEnumeracionCards_byPage:this.props.NumMaxPag;
    if (productos !== undefined) {
      let Inicio = (this.props.paginated.page - 1) * NumeracionMaximoTarjetas;
      return productos.slice(Inicio, Inicio + NumeracionMaximoTarjetas);
    }
    return [];
  }


  render() {
    const { IndiceFinal, IndicesArray }=this.Actualizar()
    let NewPageProducts=this.obtenerCountriesPagina(this.props.paginated.productsView);
    if(JSON.stringify(NewPageProducts)!==JSON.stringify(this.props.paginated.productsViewPage)){
    this.props.changePaginatedByPage(NewPageProducts)}

    return (
      <nav aria-label="Countries Pagination" className={this.props.stylePaginated.paginationGlobal}>
        <ul className={this.props.stylePaginated.pagination}>
          <li
            key={0}
            className="page-item"
            id={this.props.paginated.page === 1 && this.props.stylePaginated.Inhabilitado}
            onClick={() =>
              this.changePage(this.props.paginated.page - 1, IndiceFinal)
            }
          >
            <AiFillCaretLeft/>
          </li>
          {IndicesArray.map((page, index) => {
            return (
              <li
                key={index + 1}
                className="page-item"
                id={this.props.paginated.page === page && this.props.stylePaginated.pagSeleccionada}
                onClick={() => this.changePage(page, IndiceFinal)}
              >
                {page}
              </li>
            );
          })}
          <li
            key={IndiceFinal + 1}
            className="page-item"
            id={this.props.paginated.page === IndiceFinal && this.props.stylePaginated.Inhabilitado}
            onClick={() =>
              this.changePage(this.props.paginated.page + 1, IndiceFinal)
            }
          >
            <AiFillCaretRight />
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    paginated: state.paginated,
  };
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return {
    changePaginatedPage: (page) => dispatch(changePaginatedPage(page)),
    changePaginatedByPage:(productsByPage) => dispatch(changePaginatedByPage(productsByPage)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginated);
