import { Link , useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

import logo from "../assets/img/logo.png";
import bg from "../assets/img/gmaps.jpg";

export function Register(){
    const navigate = useNavigate();
    const handleSubmitRegister = (event) => {
        event.preventDefault();

        const nome = event.target.nome.value;
        const email = event.target.email.value;
        const endereco = event.target.endereco.value;
        const cpf = event.target.cpf.value;
        const senha = event.target.senha.value;

        fetch("https://denguealerta202401-production.up.railway.app/auth/signup",
        {
            method : "POST" ,
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                nome,
                email,
                endereco,
                cpf,
                senha,
            })
        })
        .then((response) => response.json())
        .then(() => {
            alert("Cadastro efetuado com sucesso!")
            navigate("/");
        })
        .catch((error) => {
            console.log(error);
            alert("Erro ao efetuar cadastro, preencha todos os campos!");
        });
    };

    return(
        <>
        <main className="content" style={{backgroundImage: `url(${bg})`}}>
        <img src={logo} width="120" className="mb-5"/>

        <form onSubmit={handleSubmitRegister}>
            <input
                type="text" 
                placeholder="Seu nome" 
                name="nome"
                className="input mb-5" 
                required 
            />
            <input
                type="email" 
                placeholder="Seu e-mail" 
                name="email"
                className="input mb-5" 
                required 
            />
            <input
                type="text" 
                placeholder="Seu endereço" 
                name="endereco"
                className="input mb-5" 
                required 
            />
            <input
                type="text" 
                placeholder="CPF" 
                name="cpf"
                className="input mb-5"
                maxLength={11}
                minLength={11} 
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
                Cadastrar
            </button>
        </form>

        <Link to="/" className="mb-5">
        Voltar para login
        </Link>
        </main>
        
        <Footer />
        </>
    );
}