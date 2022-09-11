import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./Carry.module.css";
import ProfileCard from "./ProfileCard.jsx";

class Profile extends Component {
    render() {
        let { user_login } = this.props;
        return (
            <div className={style.mainContainer}>
                {user_login !== null && user_login !== undefined && user_login.id != false ? (
                    <div className={style.containCarry}>
                        <div>
                            <ProfileCard
                                email={user_login.email}
                                name={user_login.name}
                                lastName={user_login.lastName}
                                password={user_login.password}
                                image={user_login.image}
                                address={user_login.address}
                                isAdmin={user_login.isAdmin}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="cards">
                        <p>
                            <b>{"No found Profile"}</b>
                        </p>
                    </div>
                )
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user_login: state.user_login,
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);