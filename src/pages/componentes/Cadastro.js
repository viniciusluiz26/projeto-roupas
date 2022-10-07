import React, { useState, useEffect, useContext } from "react"
import FormularioCadastro from "./FormularioCadastro"
import { getDatabase, ref, child, get, update, query } from 'firebase/database';
import fireDb, { db } from '../../firebase'
import Swal from 'sweetalert2'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { AuthGoogleContext } from "../../context/authGoogle"
import { Navigate } from "react-router-dom"
import { async } from "@firebase/util";
import { addDoc, collection, getDocs, updateDoc, where } from "firebase/firestore";

const Cadastro = () => {

    const { user, signOut } = useContext(AuthGoogleContext);

    let userLogado = JSON.parse(user);

    let [dadosUsuarios, setDadosUsuarios] = useState({})

    let [idAtual, setIdAtual] = useState('')

    useEffect(() => {
        const getUsers = async () => {
            const q = query(collection(db, "usuarios"), where("status", "==", "open"));

            const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                setDadosUsuarios({
                    ...doc.data(), id:doc.id
                }

                )
            });

        }; getUsers(); 
        console.log(dadosUsuarios);


        // const recentPostsRef = query(ref(fireDb, 'usuarios'), );
        // fireDb.child('usuarios').on('value', dbPhoto => {
        //     if (dbPhoto.val() != null) {
        //         setDadosUsuarios({
        //             ...dbPhoto.val()
        //         })
        //         console.log(...dbPhoto.val);
        //     } else {
        //         setDadosUsuarios({})
        //     }
        // })
    }, [])

    const addEedit = async obj => {

        if (idAtual == '') {

            console.log(obj)
            const docRef = await addDoc(collection(db, "usuarios"),
                obj,
            );
            console.log(docRef);
            // fireDb.child('usuarios').push(
            //     obj,
            //     error => {
            //         if (error) {
            //             console.log(error)
            //         } else {
            //             setIdAtual('')
            //         }
            //     }
            // )
        } else {
            const docRef = await updateDoc(collection(db, `usuarios/${idAtual}`),
                obj,
            );
            // fireDb.child(`usuarios/${idAtual}`).set(
            //     obj,
            //     err => {
            //         if (err) {
            //             console.log(err)
            //         }
            //     }
            // )
        }
    }
    const handleComplete = async (id) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `usuarios/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
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
                fireDb.child(`usuarios/${key}`).remove(
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
            <div className="jumbotron bg-dark jumbotron-fluid text-white">
                <div className="container">
                    <h1 className="display-6 d-block"> Bem vindo ao Cadastro de atendimentos - SAC</h1>
                    <p className="lead">Usario logado: {userLogado.displayName} </p>
                    <button type="button" className="btn btn-outline-danger" onClick={() => signOut()}><strong>Sair</strong></button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <FormularioCadastro  {...({ addEedit, idAtual, dadosUsuarios })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-boderless table-striped">
                        <thead className="thead-light">
                            <tr>
                                <td>Nome completo</td>
                                <td>Telefone</td>
                                <td>E-mail</td>
                                <td>Descrição</td>
                                <td>Ações</td>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(dadosUsuarios).map(id => {
                                    return <tr key={id}>
                                        <td> {dadosUsuarios[id].nomeCompleto} </td>
                                        <td> {dadosUsuarios[id].telefone} </td>
                                        <td> {dadosUsuarios[id].email} </td>
                                        <td>
                                            <Tippy content={dadosUsuarios[id].descricao} >
                                                <span>
                                                    <button>+Info</button>
                                                </span>
                                            </Tippy>
                                        </td>
                                        <td>
                                            <a className="btn btn-primary" onClick={() => { setIdAtual(id) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn btn-danger" onClick={() => deletePaciente(id)}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                            <a className="btn btn-success" onClick={() => handleComplete(id)}>
                                                <i className="fa fa-check"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default Cadastro