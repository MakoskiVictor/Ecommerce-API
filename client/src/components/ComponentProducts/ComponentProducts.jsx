import ProductCards from "..//Products/ProductCards.jsx";
import Filter from "../Filter/Filter.jsx";
import Paginated from "../Paginated/Paginated.jsx";
import s from "./ComponentProducts.module.css"

export const ComponentProducts = () => {
    return (
        <div className={s.containerProductsGlobal}>
            <div>
                <Filter />
            </div>
            <div className={s.containerProductsGlobal2}>
            <Paginated />
            <ProductCards />
            <Paginated />
            </div>
        </div>
    )
}
export default ComponentProducts