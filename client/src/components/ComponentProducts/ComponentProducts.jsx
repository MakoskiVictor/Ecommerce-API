import ProductCards from "..//Products/ProductCards.jsx";
import Filter from "../Filter/Filter.jsx";
import Paginated from "../Paginated/Paginated.jsx";
import s from "./ComponentProducts.module.css"
import styleFilter from "./Filter.module.css"
import stylePaginated from "./Paginated.module.css";
import styleCards from "./ProductCards.module.css";
import styleCard from "./ProductCard.module.css";

export const ComponentProducts = () => {
    return (
        <div className={s.containerProductsGlobal}>
            <div>
            <Filter styleFilter={styleFilter}/>
            </div>
            <div className={s.containerProductsGlobal2}>
            <Paginated stylePaginated={stylePaginated} NumMaxtarg={15}/>
            <ProductCards styleCards={styleCards} styleCard={styleCard} />
            <Paginated stylePaginated={stylePaginated} NumMaxtarg={15} />
            </div>
        </div>
    )
}
export default ComponentProducts