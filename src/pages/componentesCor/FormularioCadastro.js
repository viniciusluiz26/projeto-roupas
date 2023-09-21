import React, { useEffect, useState, useContext, useMemo } from "react";
import "cleave.js/dist/addons/cleave-phone.br";
import { AuthGoogleContext } from "../../context/authGoogle"

const FormularioCadastro = (props) => {

    // Onde envio os dados para o banco
    const manipuladorFormEnvio = e => {

        props.addEdit(values)
    }

    const { user } = useContext(AuthGoogleContext);

    const userLogado = JSON.parse(user);

    // variaveis captura de dados
    const camposIniciaisDeValores = {
        cor: '',
        hex: '',
    }
    // local onde estou armazenando as informações para interação
    let [values, setValues] = useState(camposIniciaisDeValores)

    // prop de edição
    useEffect(() => {
        if (props.idAtual == '') {
            setValues({
                ...camposIniciaisDeValores
            })
        } else {
            setValues({
                ...props.cores[props.idAtual]
            })
        }
    }, [props.idAtual, props.cores])

    const manipuladorInputChange = (e) => {
        let { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        });
    };

    
    return (

        <form autoComplete="off" onSubmit={manipuladorFormEnvio}>

            <h2>Informe a cor e seu respectivo código Hex</h2>
            <br></br>
            
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-building"></i>
                        </div>
                    </div>

                    <input className="form-control" placeholder="Cor" name="cor" value={values.cor}
                        onChange={manipuladorInputChange} required />
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-building"></i>
                        </div>
                    </div>

                    <input className="form-control" placeholder="Cod. Hex" name="hex" value={values.hex}
                        onChange={manipuladorInputChange} maxLength={6} />
                </div>


                <div className="form-group input-group col-md-6">
                    <input type="submit" value={props.idAtual == '' ? 'Salvar' : 'Atualizar'} className="btn btn-dark btn-block" />
                </div>
        </form>

    )
}


export default FormularioCadastro