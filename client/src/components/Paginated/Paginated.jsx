import React, { Component } from "react";
import { connect } from "react-redux";
import {changePaginatedPage}  from '../../redux/actions'
import './Paginated.css';

class Paginated extends Component { 
  
 Actualizar(){
  const SizeEnumeracionPaginado=10;
  const SizeWhachCards=10;
  let IndiceFinal=Math.floor(this.props.paginated.productsView.length/SizeWhachCards)+(this.props.paginated.productsView.length%SizeWhachCards===0?0:1);
    let PaginaStart=(this.props.paginated.page-(Math.floor((SizeEnumeracionPaginado/4))))<1?1:this.props.paginated.page-Math.floor(SizeEnumeracionPaginado/2);
     PaginaStart=(IndiceFinal-PaginaStart)>(SizeEnumeracionPaginado-1)?PaginaStart:IndiceFinal-(SizeEnumeracionPaginado-1);
     PaginaStart=PaginaStart<1?1:PaginaStart;

      let IndicesArray=[];
      IndicesArray.push(1);
      let Longitud=((IndiceFinal>(SizeEnumeracionPaginado-1))?SizeEnumeracionPaginado:IndiceFinal);
      for(let i=1;i<Longitud;i++){
        if(i!==Longitud-1)
        IndicesArray.push(PaginaStart+i);
        else
        IndicesArray.push(IndiceFinal);
      }
   return {IndiceFinal:IndiceFinal,IndicesArray:IndicesArray};
 }


  changePage(page,IndiceFinal){
  if(page>0 && page<=IndiceFinal)
    this.props.changePaginatedPage(page)
  }

    render() {
       const {IndiceFinal,IndicesArray}=this.Actualizar();
       console.log(this.props.paginated.page)
       return (
          <nav aria-label="Countries Pagination" className="NavPaginacion">
            <ul className="pagination">
            <li key={0} className="page-item"  id={this.props.paginated.page===1?"Inhabilitado":"Habilitado"} onClick={()=>this.changePage(this.props.paginated.page-1,IndiceFinal)}>
                  Previous
            </li> 
            { IndicesArray.map((page, index) => {  
                 return(
                 <li key={index+1} className="page-item" id={this.props.paginated.page===page?"pagSeleccionada":"pagNoSeleccionada"} onClick={()=>this.changePage(page,IndiceFinal)}>
                    {page}
                </li>)
              }) 
            }
            <li key={IndiceFinal+1} className="page-item" id={this.props.paginated.page===IndiceFinal?"Inhabilitado":"Habilitado"}  onClick={()=>this.changePage(this.props.paginated.page+1,IndiceFinal)}>
                Next
            </li> 
            </ul>
          </nav>
      ); 
    }
}

function mapStateToProps(state){
    return{
        paginated: state.paginated,
    }
}
    
function mapDispatchToProps(dispatch){
    //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
    return{
        changePaginatedPage:  page=> dispatch(changePaginatedPage(page)),
    }
}
    
export default connect(mapStateToProps,mapDispatchToProps)(Paginated);