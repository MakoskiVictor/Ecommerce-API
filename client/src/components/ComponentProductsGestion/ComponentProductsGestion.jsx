import ProductGestion from "../ProductsGestion/ProductGestion";
import Filter from "../Filter/Filter.jsx";
import Paginated from "../Paginated/Paginated.jsx";
import FilterDetail from "../FilterDetail/FilterDetail.jsx";
import s from "./ComponentProducts.module.css"
import styleFilter from "./Filter.module.css"
import stylePaginated from "./Paginated.module.css";
import styleCards from "./ProductGestionCards.module.css";
import styleCard from "./ProductGestionCard.module.css";
import styleFilterDetail from "./FilterDetailGestion.module.css";

export const ComponentProductsGestion = () => {
    return (
        <div className={s.containerProductsGlobal}>
            <div>
            <Filter styleFilter={styleFilter}/>
            </div>
            <div className={s.containerProductsGlobal2}>
            <FilterDetail styleFilterDetail={styleFilterDetail}/>
            <Paginated stylePaginated={stylePaginated} NumMaxtarg={15}/>
            <ProductGestion styleCards={styleCards} styleCard={styleCard} />
            <Paginated stylePaginated={stylePaginated} NumMaxtarg={15}/>            
            </div>
        </div>
    )
}
export default ComponentProductsGestion