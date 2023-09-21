import React, { useEffect, useState, useContext, useMemo } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from 'firebase/compat/app';
import "cleave.js/dist/addons/cleave-phone.br";
import { AuthGoogleContext } from "../../context/authGoogle"


const FormularioCadastroRoupas = (props) => {

    const [dataCor, setDataCor] = useState([]);
    const [dataTam, setDataTam] = useState([]);

    const manipuladorFormEnvio = e => {
        props.addEdit(values)
    }

    const { user } = useContext(AuthGoogleContext);

    const userLogado = JSON.parse(user);

    // variaveis captura de dados
    const camposIniciaisDeValores = {
        nome: '',
        cor: '',
        tamanho: '',
        valor: '',
    }
    // local onde estou armazenando as informações para interação
    let [values, setValues] = useState(camposIniciaisDeValores)

    // prop de edição
    useEffect(() => {
        if (props.roupa.id == '') {
            setValues({
                ...camposIniciaisDeValores
            })
        } else {
            setValues(props.roupa)
        }
    }, [props.roupa])

    useEffect(() => {
        const databaseRef = firebase.database().ref('/tamanhos');

        databaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                // Transforme o objeto de snapshot em um array
                const dataArray = Object.values(snapshot.val());
                setDataTam(dataArray);
            }
        });
    }, []);

    useEffect(() => {
        const databaseRef = firebase.database().ref('/cores');

        databaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                // Transforme o objeto de snapshot em um array
                const dataArray = Object.values(snapshot.val());
                setDataCor(dataArray);
            }
        });
    }, []);

    const manipuladorInputChange = (e) => {
        let { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        });
    };



    return (

        <form autoComplete="off" onSubmit={manipuladorFormEnvio}>

            <h2>Informe o nome, cor, tamanho e valor da peça</h2>
            <br></br>

            <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-tshirt"></i>
                    </div>
                </div>

                <input className="form-control" placeholder="Nome" name="nome" value={values.nome}
                    onChange={manipuladorInputChange} required />
            </div>

            <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fas fa-fill-drip"></i>
                    </div>
                </div>

                <select id="cor" name="cor" className="form-control" placeholder="Cor" value={values.cor} onChange={manipuladorInputChange}>
                    <option hidden>Cor</option>
                    {dataCor.map((id, index) => (
                        <option key={index} value={id.cor}>{id.cor}</option>
                    ))}
                </select>
            </div>

            <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-ruler-vertical"></i>
                    </div>
                </div>

                <select id="tamanho" name="tamanho" className="form-control" placeholder="Tamanho" value={values.tamanho} onChange={manipuladorInputChange}>
                    <option hidden>Tamanho</option>
                    {dataTam.map((id, index) => (
                        <option key={index} value={id.tamanho}>{id.tamanho}</option>
                    ))}
                </select>
            </div>

            <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-money-bill-wave-alt"></i>
                    </div>
                </div>

                <input className="form-control" placeholder="Valor" name="valor" value={values.valor}
                    onChange={manipuladorInputChange} />
            </div>


            <div className="form-group input-group col-md-6">
                <input type="submit" value={props.roupa.id ? 'Atualizar' : 'Criar'} className="btn btn-dark btn-block" />
            </div>
        </form>

    )
}


export default FormularioCadastroRoupas