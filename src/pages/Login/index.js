import { useContext } from "react";
import { GoogleLogo } from "phosphor-react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../context/authGoogle";
import "./styles.scss"
import "../styles.css"


export const Login = (user, signOut) => {
    const { signInGoogle, signed } = useContext(AuthGoogleContext);

    async function loginGoogle() {
        await signInGoogle();
    }
    if (!signed) {
        return (
            <div className="container2">
                <h1>Acesse sua conta</h1>
                <span>
                    Ao clicar no botão você será redirecionado para autenticação com o Google
                </span>

                <button type="button" onClick={loginGoogle} className="button">
                    <GoogleLogo />
                    <strong>Entrar com o Google</strong>
                </button>
            </div>
        )
    } else {
        return <Navigate to="/Cadastro" />
    }

};

