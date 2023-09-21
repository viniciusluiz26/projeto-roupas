import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import Cadastro from "../pages/componentesCor/Cadastro";
import { Login } from "../pages/login/"
import CadastroTam from "../pages/componentesTamanho/CadastroTam";
import CadastroRoupas from "../pages/componentesRoupas/CadastroRoupas";



export const AppRoutes = () => {
    return (
    <BrowserRouter>
    <Fragment>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Cadastro" element={<PrivateRoutes />}>
            <Route path="/Cadastro" element={<Cadastro />} />
            </Route>
            <Route path="/CadastroTam" element={<CadastroTam />} />
            <Route path="/CadastroRoupas" element={<CadastroRoupas/>} />
        
        </Routes>
    </Fragment>
    </BrowserRouter>
    );
};