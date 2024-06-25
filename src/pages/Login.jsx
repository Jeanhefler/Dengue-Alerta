import { useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { UserContext } from "../context/UserContext";

import logo from "../assets/img/logo.png";
import bg from "../assets/img/gmaps.jpg";

export function Login(){
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleSubmitLogin = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const senha = event.target.senha.value;

        fetch("https://denguealerta202401-production.up.railway.app/auth/signin",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                email,
                senha,
            })
        })
        .then((response) => {
            if(response.status != 200){
                throw new Error();
            }

            return response.text();
        })
        .then((data) => {
            console.log(data);
            login(data);
            navigate("/home")
        })
        .catch(() => alert("Verifique usuário ou senha!"))
    }
    return(
        <>
        <main className="content" style={{backgroundImage: `url(${bg})`}}>
        <img src={logo} width="120" className="mb-5"/>

        <form onSubmit={handleSubmitLogin}>
            <input
                type="email" 
                placeholder="Digite seu e-mail" 
                name="email"
                className="input mb-5" 
                required 
            />
            <input
                type="password" 
                placeholder="Digite sua senha" 
                name="senha" 
                className="input mb-5"
                required 
            />
            <button type="submit" className="btn mb-5">
                Entrar
            </button>
        </form>

        <Link to="/register" className=" btn mb-5">Crie sua conta</Link>
        </main>
        <Footer />
        </>
    );
}