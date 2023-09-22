import React, { useState, useEffect, useContext } from "react"
import { getDatabase, ref, child, get, update, query, set } from 'firebase/database';
import fireDb, { db } from '../../firebase'
import Swal from 'sweetalert2'
import { AuthGoogleContext } from "../../context/authGoogle"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FormularioCadastroRoupas from "./FormularioCadastroRoupas";


const CadastroRoupas = (props) => {

    const { user, signOut } = useContext(AuthGoogleContext)

    let [roupas, setRoupas] = useState([])

    const roupaInitialState = {
        id: '',
        nome: '',
        cor: '',
        tamanho: '',
        valor: ''
    }

    let [roupa, setRoupa] = useState(roupaInitialState)

    useEffect(() => {
        fireDb.child('roupas').on('value', dbPhoto => {
            if (dbPhoto.val() != null) {
                const roupas = Object.entries(dbPhoto.val()).map(item => { return {id: item[0], ...item[1]}}).sort((a, b) => a.nome.localeCompare(b.nome))
                setRoupas(roupas)

            } else {
                setRoupas([])
            }
        })
    }, [])


    const addEdit = obj => {
        if (!roupa.id) {
            fireDb.child('roupas').push(
                obj,
                error => {
                    if (error) {
                        console.log(error)
                    } else {
                        setRoupa({})
                    }
                }
            )
        } else {
            fireDb.child(`roupas/${roupa.id}`).set(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        }
    }

    const navigate = useNavigate()


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })


    const deleteProduto = key => {
        swalWithBootstrapButtons.fire({
            title: 'Você tem certeza que deseja cancelar?',
            text: "Não sera possivel reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, apague!',
            cancelButtonText: 'Não, cancele!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fireDb.child(`roupas/${key}`).remove(
                    err => {
                        if (err) {
                            console.log(err)
                        }
                    }
                )
                swalWithBootstrapButtons.fire(
                    'Deletado!',
                    'Seu arquvio foi deletado com sucesso!',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado!',
                    'Seu arquivo está seguro! :)',
                    'error'
                )
            }

        })


    }

    const usuariosArray = Object.values(roupas);

    usuariosArray.sort((a, b) => a.nome.localeCompare(b.nome));  


    return (

        <div>
            <nav id="menu-h">
                <ul>
                    <li>
                        <a href="/">
                            Cadastro de Cores
                        </a>
                    </li>
                    <li>
                        <a href="/CadastroTam">
                            Cadastro de Tamanhos
                        </a>
                    </li>
                    <li>
                        <a href="/CadastroRoupas">
                            Cadastro de Roupas
                        </a>
                    </li>
                </ul>
                <div className="jumbotron bg-dark jumbotron-fluid text-white" id="caixaJumbo">
                    <div className="container3">
                        <h1 className="display-6 d-block">Cadastro de Roupas</h1><br></br>                        
                    </div>
                </div>
            </nav>
            <div className="row">
                <div className="col-md-6">
                    <FormularioCadastroRoupas {...({ addEdit, roupa })} />
                </div>

                <div className="col-md-6">
                    <h2 className="lead">Lista de roupas cadastradas</h2>
                    <table className="table table-boderless table-striped">
                        <thead className="thead-light">
                            <tr className="table-secondary">
                                <td>Nome</td>
                                <td>Cor</td>
                                <td>Tamanho</td>
                                <td>Valor</td>
                                <td>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                roupas.map(roupa => {                                    
                                        return <tr key={roupa.id}>
                                            <td> {roupa.nome} </td>
                                            <td> {roupa.cor} </td>
                                            <td> {roupa.tamanho} </td>
                                            <td> {roupa.valor} </td>
                                            <td>
                                                <a className="btn btn-primary" onClick={() => { setRoupa(roupa) }}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </a>
                                                <a className="btn btn-danger" onClick={() => deleteProduto(roupa.id)}>
                                                    <i className="far fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>                                
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}


export default CadastroRoupas