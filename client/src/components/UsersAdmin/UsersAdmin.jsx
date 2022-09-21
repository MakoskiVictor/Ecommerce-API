import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllUsers } from "../../redux/actions";
import CardUsersAdmin from "./CardUsersAdmin";
import ErrorPage from "../ErrorPage/ErrorPage";
import SearchBar from "./SearchBar/SearchBar";
import Style from "./UsersAdmin.module.css";
import Paginated from "../Paginated Reutilizable/Paginated_Reutilizable.jsx";
import stylePaginated from "./Paginated.module.css";
/*
//productsView
//page
   // paginated: state.paginated,
   // changePaginatedPage: (page) => dispatch(changePaginatedPage(page)),
   // changePaginatedByPage:(productsByPage) => dispatch(changePaginatedByPage(productsByPage)),
*/


export default function UsersAdmin() {


    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers);
    const user_login = useSelector((state) => state.user_login);

  const [paginated, SetPaginated] = useState({
    productsView: [],
    page: 1,
    productsViewPage:[]
  });


  const changePaginatedPage = (newPage) => {
    SetPaginated({
        ...paginated,
        page: newPage,
      });
   };

   const changePaginatedByPage = (productsByPage) => {
    SetPaginated({
        ...paginated,
        productsViewPage: productsByPage,
      });
   };

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(deleteUsers())
    }, [dispatch])

    if( JSON.stringify(paginated.productsView)!=JSON.stringify(users)){
        SetPaginated({
            ...paginated,
            productsView: users,
          }); 
    }
    
    return (
        <div>
        <Paginated stylePaginated={stylePaginated} NumMaxtarg={10} changePaginatedPage={(e)=>changePaginatedPage(e)} 
              changePaginatedByPage={(e)=>changePaginatedByPage(e)} paginated={paginated} />
              
        <div className={Style.containMain}>
            {user_login.id && user_login.isAdmin === true ?
                <div>
                    {console.log(paginated.productsViewPage)}
                    <h1> REGISTERED USERS </h1>
                    <SearchBar users={users} />
                    {paginated.productsViewPage.length > 0 ?
                        paginated.productsViewPage.map((users) => {
                            return (
                                <CardUsersAdmin
                                    key={users.id}
                                    email={users.email}
                                    image={users.image}
                                    name={users.name}
                                    lastName={users.lastName}
                                    id={users.id}
                                    address={users.address}
                                    isAdmin={users.isAdmin}
                                    isBaned={users.isBaned}
                                />
                            )
                        }) :
                        <p className={Style.noUsers}>NO USERS FOUNDED</p>}
                </div>
                :
                <ErrorPage />
            }
        </div>
        </div>
    )
}
