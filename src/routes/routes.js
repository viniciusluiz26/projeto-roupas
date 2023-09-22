import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import Cadastro from "../pages/componentesCor/Cadastro";
import CadastroTam from "../pages/componentesTamanho/CadastroTam";
import CadastroRoupas from "../pages/componentesRoupas/CadastroRoupas";



export const AppRoutes = () => {
    return (
    <BrowserRouter>
    <Fragment>
        <Routes>            
            {/* <Route path="/Cadastro" element={<PrivateRoutes />}> */}
            <Route path="/" element={<Cadastro />} />
            {/* </Route> */}
            <Route path="/CadastroTam" element={<CadastroTam />} />
            <Route path="/CadastroRoupas" element={<CadastroRoupas/>} />
        
        </Routes>
    </Fragment>
    </BrowserRouter>
    );
};