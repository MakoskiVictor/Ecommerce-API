import { BiUser } from "react-icons/bi";
import { IconContext } from "react-icons";
import Style from "./NavUser.module.css"
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/actions";
import { useAuth } from "../../context/authContext";


function NavUser() {
  //login Google
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(Logout());
    } catch (error) {
      console.error(error.message);
    }
  };

  


  // login email
  const dispatch = useDispatch()

  // function OnLogout() {

  // }


  return (
    <div class={Style.navbar}>
      <div class={Style.dropdown}>

        <button class={Style.dropbtn} >
          <IconContext.Provider value={{ color: 'white', size: '25px' }}>
            <BiUser />
          </IconContext.Provider>
          <i class={Style.fa_fa_caret_down}></i>
        </button>
        <div class={Style.dropdown_content}>
          <a href="#" onClick={handleLogout}>Logout</a>
          <a href="/profile">Profile</a>
          {/*<a href="#">Link 2</a>
          <a href="#">Link 3</a>*/}
        </div>
      </div>
    </div>
  );
}

export default NavUser;