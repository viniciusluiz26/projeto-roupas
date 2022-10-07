import React from "react"
import 'tippy.js/dist/tippy.css'; // optional
import "cleave.js/dist/addons/cleave-phone.br"

export const Concluido = () => {

    return (

        <div>
            <div className="jumbotron bg-dark jumbotron-fluid text-white">
                <div className="container">
                    <h1 className="display-5 d-block"> Historico de chamados Uauh </h1>
                </div>
            </div>


            <table class="table table-boderless table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome Completo</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Descrição ocorrido</th>
                        <center><th>Status</th></center>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <a className="btn btn-success btn-block" >
                            <i className="fa fa-check"></i>
                        </a>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <a className="btn btn-danger btn-block" >
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <a className="btn btn-success btn-block" >
                            <i className="fa fa-check"></i>
                        </a>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <a className="btn btn-warning btn-block" >
                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                        </a>
                    </tr>

                </tbody>
            </table>


        </div>

    )

};