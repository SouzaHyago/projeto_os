import Site from "./components/Site";
import Login from "./components/Login";
import "./global.css"; 

function PaginaCadastro() {
    return (
        <div className="bg-container">
            <div className="bg-image"></div> {/* Fundo com a imagem */}
            <div className="bg-blur"></div> {/* Camada separada para o blur */}
            <div className="content">
                <Site/>
                <Login/>
            </div>
        </div>
    );
}

export default PaginaCadastro;
