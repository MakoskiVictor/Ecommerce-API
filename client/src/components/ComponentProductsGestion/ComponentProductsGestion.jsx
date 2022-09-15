import ProductGestion from "../ProductsGestion/ProductGestion";
import Filter from "../Filter/Filter.jsx";
import Paginated from "../Paginated/Paginated.jsx";
import s from "./ComponentProducts.module.css"
import styleFilter from "./Filter.module.css"
import stylePaginated from "./Paginated.module.css";
import styleCards from "./ProductGestionCards.module.css";
import styleCard from "./ProductGestionCard.module.css";

export const ComponentProductsGestion = () => {
    return (
        <div className={s.containerProductsGlobal}>
            <div>
            <Filter styleFilter={styleFilter}/>
            </div>
            <div className={s.containerProductsGlobal2}>
            <Paginated stylePaginated={stylePaginated}/>
            <ProductGestion styleCards={styleCards} styleCard={styleCard} />
            <Paginated stylePaginated={stylePaginated} />
            </div>
        </div>
    )
}
export default ComponentProductsGestion