
function Card(attr){

    return(


        <div className={"card"} onClick={""}>
            <p className='titulo'><u>O.S.</u></p> 
            <p>< strong>{attr.nome}</strong></p>
            <p> <strong>cod.{attr.codigo}</strong></p>                      
            <p className={attr.css}><strong>Status:{attr.status}</strong></p>

        </div>
    )
}
export default Card;