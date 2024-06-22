import { useContext } from "react";
import { UserContext } from "../../context/UserContext"

import "./header.css";
import logo from "../../assets/img/logotexto.jpg";

export function Header(){
    const { logout } = useContext(UserContext);

    return(
        <header className="headerComponent">
            <img src={logo} alt="" className="logo"/>
            <a href="#" onClick={() => logout()}>
                Sair
            </a>
        </header>
    );
}