import React, { useState, useEffect, useContext } from "react"
import FormularioCadastro from "./FormularioCadastroTam"
import { getDatabase, ref, child, get, update, query, set } from 'firebase/database';
import fireDb, { db } from '../../firebase'
import Swal from 'sweetalert2'
import { AuthGoogleContext } from "../../context/authGoogle"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FormularioCadastroTam from "./FormularioCadastroTam";


const CadastroTam = (props) => {

    const notify = () => toast.success("Chamado arquivado com sucesso!");

    const { user, signOut } = useContext(AuthGoogleContext)

    let [tamanhos, setTamanhos] = useState({})

    let [idAtual, setIdAtual] = useState('')

    useEffect(() => {
        fireDb.child('tamanhos').on('value', dbPhoto => {
            if (dbPhoto.val() != null) {
                setTamanhos({
                    ...dbPhoto.val()
                })

            } else {
                setTamanhos({})
            }
        })
    }, [])


    const addEdit = obj => {

        if (idAtual == '') {
            fireDb.child('tamanhos').push(
                obj,
                error => {
                    if (error) {
                        console.log(error)
                    } else {
                        setIdAtual('')
                    }
                }
            )
        } else {
            fireDb.child(`tamanhos/${idAtual}`).set(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        }
    }


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const deletePaciente = key => {
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
                fireDb.child(`tamanhos/${key}`).remove(
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
                        <h1 className="display-6 d-block">Cadastro de Tamanhos</h1><br></br>                        
                    </div>
                </div>
            </nav>
            <div className="row">
                <div className="col-md-6">
                    <FormularioCadastroTam  {...({ addEdit, idAtual, tamanhos })} />
                </div>

                <div className="col-md-6">
                    <h2 className="lead">Lista de tamanhos cadastradas</h2>
                    <table className="table table-boderless table-striped">
                        <thead className="thead-light">
                            <tr className="table-secondary">
                                <td>Tamanho</td>
                                <td>Ações</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Object.keys(tamanhos).map(id => {                                    
                                        return <tr key={id}>
                                            <td> {tamanhos[id].tamanho} </td>
                                            <td>

                                                <a className="btn btn-primary" onClick={() => { setIdAtual(id) }}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </a>
                                                <a className="btn btn-danger" onClick={() => deletePaciente(id)}>
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


export default CadastroTam