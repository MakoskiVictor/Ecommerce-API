import { BiUser } from "react-icons/bi";
import { IconContext } from "react-icons";
import Style from "./NavUser.module.css"
import { useDispatch} from "react-redux";
import {Logout} from "../../redux/actions";

function NavUser() {

  const dispatch = useDispatch()
  
 function OnLogout(){
  dispatch(Logout());
}


  return (
    <div class={Style.navbar}>
      <div class={Style.dropdown}>
      
        <button class={Style.dropbtn} >
          <IconContext.Provider  value={{ color: 'white', size: '25px'}}>
          <BiUser />
           </IconContext.Provider>
          <i class={Style.fa_fa_caret_down}></i>
        </button>
        <div class={Style.dropdown_content}>
          <a href="#" onClick={()=>OnLogout()}>Logout</a>
          {/*<a href="#">Link 2</a>
          <a href="#">Link 3</a>*/}
        </div>
      </div>
    </div>
  );
}

export default NavUser;