import { useContext } from "react";
import { GoogleLogo } from "phosphor-react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../context/authGoogle";
import logo from "../../../src/logo.svg"
import "./styles.scss"


export const Login = (user, signOut) => {
    const { signInGoogle, signed } = useContext(AuthGoogleContext);
    
    async function loginGoogle() {
        await signInGoogle();
    }
    if (!signed) {
        return (
            <div className="container2">
                {/* <div className="container-login">
                    <div className="wrap-login">
                        <div className="login-form">
                             <span className="login-form-title">Bem Vindo!</span>
                                 <span className="login-form-title">
                                <img src={uauhIMG} alt="Uauh Cartões Logo" /> 
                            </span>

                        </div>
                    </div>
                </div>*/}

              <h1>Acesse sua conta</h1>
            
              <span>
                Ao clicar no botão você será redirecionado para autenticação com o Google <br />
                Mas fique tranquilo, não vai doer nada! prometo :)
              </span>
        
              <button type="button" onClick={loginGoogle} className="button">
              <GoogleLogo />
                <strong>Entrar com o Google</strong>
              </button>
            </div>
            
            
        ) 
    }else {
        return <Navigate to="/Cadastro" />
    }
    
};

