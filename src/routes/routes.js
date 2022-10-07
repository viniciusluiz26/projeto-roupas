import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import Cadastro from "../pages/componentes/Cadastro";
import { Login } from "../pages/Login"
import { Concluido } from "../pages/Concluido"



export const AppRoutes = () => {
    return (
    <BrowserRouter>
    <Fragment>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Cadastro" element={<PrivateRoutes />}>
            <Route path="/Cadastro" element={<Cadastro />} />
            </Route>
            <Route path="/Concluido" element={<Concluido />} />
        </Routes>
    </Fragment>
    </BrowserRouter>
    );
};