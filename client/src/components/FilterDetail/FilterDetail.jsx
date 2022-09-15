import React, { Component } from "react";
import { connect } from "react-redux";


class FilterDetail extends Component {
    render() {
        const { nameProductSearched, filterBrand, filterGender, filterCategory, filterForPrice, min, max, filterUrl } = this.props.filters;
        return (
            <div className={this.props.styleFilterDetail}>
                {nameProductSearched !== "" &&
                <p>Start: Letters: {nameProductSearched}</p>}
                <p>Gender: {filterGender}</p>
                <p>Category: {filterCategory}</p>
                {filterForPrice &&
                    (<p>Price: Min: ${min}  Max: ${max}</p>)
                }
                
                {filterBrand.length !== 0 &&
                   (<p>Brands :{
                    filterBrand.map((Marcas,index) => {
                        return (
                            <label> {Marcas}{index<filterBrand.length-1 && " || "}</label>
                        );
                    })}
                   </p>)
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        filters: state.filters,
    };
}

export default connect(mapStateToProps)(FilterDetail);