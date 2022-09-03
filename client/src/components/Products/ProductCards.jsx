import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from './ProductCard.jsx';
import styles from "./ProductCards.module.css";

class ProductCards extends Component { 
    
obtenerProductosPagina(productos){
        if(productos!==undefined){
          let Inicio=(this.props.paginated.page-1)*10;
          return productos.slice(Inicio, Inicio+10);
        }
       return [];
}

    render() {
        let productos=this.obtenerProductosPagina(this.props.paginated.productsView)

        let fraseNoResultados="No se encontraron resultados"
       return (
        <div className={styles.productContainerGlobal}>
            {productos.length!==0 && 
            productos.map(c => <ProductCard
                  key={c.id}
                  id={c.id}
                  img={c.image}
                  name={c.name}
                  brand={c.brand}
                  price={c.price} /> )
            }
            {productos.length===0 && 
            <div className='cards'>
            <p><b>{fraseNoResultados}</b></p>
            </div>
            }
        </div>
      )
    }
}

function mapStateToProps(state){
    return{
        paginated: state.paginated,
    }
}
    
export default connect(mapStateToProps)(ProductCards);