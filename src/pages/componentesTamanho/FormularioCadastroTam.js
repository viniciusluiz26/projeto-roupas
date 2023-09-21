import React, { useEffect, useState, useContext, useMemo } from "react";
import Cleave from 'cleave.js/react';
import "cleave.js/dist/addons/cleave-phone.br";
import { AuthGoogleContext } from "../../context/authGoogle"
import TextField from '@mui/material/TextField';

const FormularioCadastroTam = (props) => {

    // Onde envio os dados para o banco
    const manipuladorFormEnvio = e => {

        props.addEdit(values)
    }

    const { user } = useContext(AuthGoogleContext);

    const userLogado = JSON.parse(user);

    // variaveis captura de dados
    const camposIniciaisDeValores = {
        tamanho: '',
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
                ...props.tamanhos[props.idAtual]
            })
        }
    }, [props.idAtual, props.tamanhos])

    const manipuladorInputChange = (e) => {
        let { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        });
    };


    return (

        <form autoComplete="off" onSubmit={manipuladorFormEnvio}>

            <h2>Informe o tamanho da peça</h2>
            <br></br>
            
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-building"></i>
                        </div>
                    </div>

                    <input className="form-control" placeholder="Tamanho" name="tamanho" value={values.tamanho}
                        onChange={manipuladorInputChange} required />
                </div>



                <div className="form-group input-group col-md-6">
                    <input type="submit" value={props.idAtual == '' ? 'Salvar' : 'Atualizar'} className="btn btn-dark btn-block" />
                </div>
            
        </form>

    )
}


export default FormularioCadastroTam