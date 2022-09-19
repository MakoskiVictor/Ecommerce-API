import React from "react";
import { Link } from "react-router-dom";

function Orders2Cards({
    id,
    create,
    idPaypal,
    price,
    stateOrder,
    stocks,
}) {

    let ArrayStocks = JSON.parse(stocks)
    console.log(ArrayStocks)
    return (
        <div >
            <p>Cod ID: {id}</p>
            <p>Creation Date: {create}</p>
            <p>ID Paypal: {idPaypal}</p>
            <p>State Order: {stateOrder}</p>
            <p>Price Total: {price}</p>
            <Link to={`/OrderDetails/${id}`}>
                <button>ViewDetails</button>
            </Link>

            {/*ArrayStocks.length !== 0 ?
                ArrayStocks.map((c) => (
                  <p>amount:{c.amount} value: {c.value} total: {(c.amount*c.value).toFixed(2)} </p>
                )) :
                <div className="cards">
                    <p>
                        <h3 className={""}>No Stocks.</h3>
                    </p>
                </div>*/
            }
            <div>"    "</div>
        </div>
    );
}

export default Orders2Cards;
