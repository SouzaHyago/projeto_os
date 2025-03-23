'use client'
import { redirect } from "next/navigation"
import "./landing.css"
import LandingCard from "./components/LandingCard"



export default function Landing(){


    const supabaseUrl = 'https://mwlfldrcwfcofgjltpaw.supabase.co'
	const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13bGZsZHJjd2Zjb2Znamx0cGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTE5NDMsImV4cCI6MjA1ODA2Nzk0M30.u2Ex73UhuEMb6nkblLV8gfl5nRKcDTqEsw19fcFN3zQ"
	const supabase = createClient(supabaseUrl, supabaseKey)
    let test = fetchData();

    async function fetchData(){
        const { data, error } = await supabase
		.from('livros')
		.select(`*`)

	    return data
    }


    

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
                <h1 className={"slogan"}>O Slogan <br/> <span className={"destaque"}>{test[0].name}</span> <br/> de todos</h1>
                <p className={"chamada"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ducimus accusantium totam nostrum saepe id, temporibus soluta ab optio accusamus tempore ratione et. In deserunt illo voluptatibus soluta totam enim! lorem</p>

                <ul>
                    <li><a href="#saibaMais">Saiba mais</a></li>
                    <li><a onClick={()=> redirect("https://chat.whatsapp.com/CmSjHo6pTF3GRx1W7Njqph")}>Contratar serviço</a></li>
                </ul>
            </div>
            <div id={"saibaMais"}>
                <h1 className={"slogan"}>Por que escolher o <br/> <span className={"destaque"}>{"\"nome do software\""}?</span></h1>
                <div className="cards">
                    <LandingCard
                        text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga reiciendis modi accusantium, distinctio quidem illum, unde fugiat cum excepturi tenetur, nesciunt repellendus. Tempora cum doloribus ipsam iusto adipisci quas modi."
                        imgLink = "https://placehold.co/450x185"
                    
                    />
                    <LandingCard
                        text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga reiciendis modi accusantium, distinctio quidem illum, unde fugiat cum excepturi tenetur, nesciunt repellendus. Tempora cum doloribus ipsam iusto adipisci quas modi."
                        imgLink = "https://placehold.co/450x185"
                    
                    />
                    <LandingCard
                        text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga reiciendis modi accusantium, distinctio quidem illum, unde fugiat cum excepturi tenetur, nesciunt repellendus. Tempora cum doloribus ipsam iusto adipisci quas modi."
                        imgLink = "https://placehold.co/450x185"
                    
                    />
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
            <footer>
                <div>
                    <ul>
                        <li>Numero de telefone generico</li>
                        <li>Rede social de escolha</li>
                        <li>Mias informações caso nescessário</li>
                        <li>Endereço novamente</li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}