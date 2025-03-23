

export default function LandingCard(attr){
        return(
            <div>
                
                <div className="card">
                    <img src={attr.imgLink} alt="" />
                    <div className={"text"}>
                        <p>{attr.text}</p>
                    </div>
                </div>
            </div>
        )
}