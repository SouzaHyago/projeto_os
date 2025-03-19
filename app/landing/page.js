import "./landing.css"

export default function Landing(){
    return(
        <div>
            <header>
                <img src="https://placehold.co/200x80" class="nomeMarca" alt=""/>
                <ul class="menu">
                    <li>Contato</li>
                    <li>Localização</li>
                </ul>
            </header>
            <div className={"mainContent"}>
                <p className={"slogan"}><h1>O Slogan <br/> <span className={"destaque"}>Mais interessante</span> <br/> de todos</h1></p>
                <p class="chamada">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ducimus accusantium totam nostrum saepe id, temporibus soluta ab optio accusamus tempore ratione et. In deserunt illo voluptatibus soluta totam enim! lorem</p>

                <ul>
                <li><a href="#">Contratar serviço</a></li>
                <li><a href="#o">Saiba mais</a></li>
                </ul>
            </div>
        </div>
    )
}