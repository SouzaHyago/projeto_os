'use client'
import { redirect } from "next/navigation"
import "./landing.css"
import axios from "axios"
import { useEffect } from "react"



export default function Landing(){

    return(
        <div>
            <header>
                <img src="https://placehold.co/200x80" className={"nomeMarca"}/>
                <ul className={"menu"}>
                    <li>Contato</li>
                    <li> <a href="#local">Localização</a> </li>
                </ul>
            </header>
            <div className={"mainContent"}>
                <h1 className={"slogan"}>O Slogan <br/> <span className={"destaque"}>Mais interessante</span> <br/> de todos</h1>
                <p className={"chamada"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ducimus accusantium totam nostrum saepe id, temporibus soluta ab optio accusamus tempore ratione et. In deserunt illo voluptatibus soluta totam enim! lorem</p>

                <ul>
                    <li><a href="#saibaMais">Saiba mais</a></li>
                    <li><a onClick={()=> redirect("https://chat.whatsapp.com/CmSjHo6pTF3GRx1W7Njqph")}>Contratar serviço</a></li>
                </ul>
            </div>
            <div id={"saibaMais"}>
                <h1 className={"slogan"}>Por que escolher o <br/> <span className={"destaque"}>{"\"nome do software\""}?</span></h1>

                <div className="cards">
                    <div className="card">
                        <img src="https://placehold.co/450x185" alt="" />
                        <div className={"text"}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nihil autem quo provident quia placeat eius vero natus expedita consequatur nostrum sit molestiae aspernatur rem minus? Ullam deleniti tempora cupiditate.</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="https://placehold.co/450x185" alt="" />
                        <div className={"text"}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nihil autem quo provident quia placeat eius vero natus expedita consequatur nostrum sit molestiae aspernatur rem minus? Ullam deleniti tempora cupiditate.</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="https://placehold.co/450x185" alt="" />
                        <div className={"text"}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nihil autem quo provident quia placeat eius vero natus expedita consequatur nostrum sit molestiae aspernatur rem minus? Ullam deleniti tempora cupiditate.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mapContainer" id="local">
                <h1 className={"slogan"}>Onde nos encontrar?</h1>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10290.662278099806!2d-42.719476810557246!3d-10.82621526220995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x76593000a976331%3A0xf734c0bfcf3d95db!2sSwordfish%20Tech!5e0!3m2!1spt-BR!2sbr!4v1742411538440!5m2!1spt-BR!2sbr"
                    width="70%"
                    height="800"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            
        </div>
    )
}