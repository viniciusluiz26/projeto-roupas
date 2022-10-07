import React, { useEffect, useState, useContext } from "react";
import Cleave from 'cleave.js/react';
import "cleave.js/dist/addons/cleave-phone.br";
import { AuthGoogleContext } from "../../context/authGoogle"


const FormularioCadastro = (props) => {

    const { user } = useContext(AuthGoogleContext);

    let userLogado = JSON.parse(user);

    console.log(userLogado);

    // variaveis captura de dados
    const camposIniciaisDeValores = {
        dataHoje: '',
        nomeCompleto: '',
        telefone: '',
        cartao: '',
        tipo: '',
        email: '',
        descricao: '',
        procede: '',
        empresa: '',
        usuario: '',
        status: 'open'
    }

    let [values, setValues] = useState(camposIniciaisDeValores)

    useEffect(() => {
        if (props.idAtual == '') {
            setValues({
                ...camposIniciaisDeValores

            })
        } else {
            setValues({
                ...props.dadosUsuarios[props.idAtual]
            })
        }
    }, [props.idAtual, props.dadosUsuarios])

    const manipuladorInputChange = e => {
        let { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
    }


    /* função data e hora automatica */
    const data = new Date()
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth()+1).padStart(2, '0')
    const ano = data.getFullYear()
    const hora = String(data.getHours()).padStart(2, '0')
    const minuto = String(data.getMinutes()).padStart(2, '0')
    const dataAtual = `${dia}/${mes}/${ano} - ${hora}:${minuto}`
    /* função data e hora automatica FIM*/

    const manipuladorFormEnvio = e => {
        e.preventDefault()
        props.addEedit(values)
    }

    return (

        <form autoComplete="off" onSubmit={manipuladorFormEnvio}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="far fa-credit-card"></i>
                    </div>
                </div>

                <Cleave className="form-control" placeholder="Numero do cartão" name="cartao" value={values.cartao}
                    onChange={manipuladorInputChange} options={{ creditCard: true }} />

            </div>
            <div className="row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="far fa-clock"></i>
                        </div>
                    </div>

                    <input className="form-control" placeholder="data" name="dataHoje" value={values.dataHoje = dataAtual}
                        onChange={manipuladorInputChange} disabled />

                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user-friends"></i>
                        </div>
                    </div>
                    <select id="tipo" name="tipo" className="form-control" placeholder="Tipo" value={values.tipo}
                        onChange={manipuladorInputChange} required>
                        <option value="selecione">Selecione</option>
                        <option value="Cliente">Cliente</option>
                        <option value="Credenciado">Credenciado</option>
                        <option value="Usuário">Usuário</option>
                    </select>
                </div>
            </div>

            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>

                <input className="form-control" name="usuario" value={values.usuario = userLogado.displayName}
                    onChange={manipuladorInputChange} disabled />
            </div>

            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>

                <input className="form-control" placeholder="Nome Completo" name="nomeCompleto" value={values.nomeCompleto}
                    onChange={manipuladorInputChange} />
            </div>

            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-building"></i>
                    </div>
                </div>

                <input className="form-control" placeholder="Empresa" name="empresa" value={values.empresa}
                    onChange={manipuladorInputChange} />
            </div>

            <div className="row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>

                    <Cleave className="form-control" placeholder="Telefone" options={{ phone: true, phoneRegionCode: 'BR' }} name="telefone" value={values.telefone}
                        onChange={manipuladorInputChange} />

                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>

                    <input className="form-control" placeholder="E-mail" name="email" value={values.email}
                        onChange={manipuladorInputChange} />
                </div>
            </div>
            <div className="form-group">
                <textarea className="form-control" placeholder="Descrição do ocorrido" name="descricao" value={values.descricao}
                    onChange={manipuladorInputChange} />
            </div>

            <div className="form-group col-lg-12 col-md-12" />
            <strong>Procede?</strong>
            <select id="procede" name="procede" className="form-control" placeholder="Procede?" value={values.procede}
                onChange={manipuladorInputChange} required>
                <option value="selecione">Selecione</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
            </select>

            <br></br>

            <div className="form-group">
                <input type="submit" value={props.idAtual == '' ? 'Salvar' : 'Atualizar'} className="btn btn-dark btn-block" />
            </div>

        </form>

    )
}



export default FormularioCadastro