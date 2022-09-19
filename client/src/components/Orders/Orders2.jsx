import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../redux/actions";
import { Link } from "react-router-dom";
import Orders2Cards from "./Orders2Cards.jsx";
import styles from "./Order.module.css";
//import { withRouter } from "react-router-dom";

class Orders2 extends Component {

    componentDidMount() {
        this.props.getOrders("UserID",this.props.user.id)
    }
    render() {
        const { orders } = this.props
        return (
            <div className={styles.cards}>
                {orders.length !== 0 ?
                    orders.map((c) => (
                        <Orders2Cards
                            key={c.id}
                            id={c.id}
                            create={c.createdAt}
                            idPaypal={c.idpurchase}
                            price={c.price}
                            stateOrder={c.stateOrder}
                            stocks={c.stocks}
                        />
                    )) :
                    <div className="cards">
                        <p>
                            <h3 className={""}>You haven't made any purchases yet. Once you purchase an item, it will show up here.</h3>
                        </p>
                    </div>
                }
            </div>
        );

    }
}
function mapStateToProps(state) {
    return {
        orders: state.orders,
        user:state.user_login
    };
}

function mapDispatchToProps(dispatch) {
    //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
    return {
        getOrders: (type,parameter) => dispatch(getOrders(type,parameter))
        //changePaginatedPage: (page) => dispatch(changePaginatedPage(page)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders2);
