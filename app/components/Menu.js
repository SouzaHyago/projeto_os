function Menu() {
    return (  
        <div style={{background: "green", padding: 10, margin: 0, display: "flex"}}>
            <h1>Work2sell</h1>
            <img src="https://placehold.co/80"/>
            <button onClick={localStorage.removeItem("usuario")}>Logout</button>
        </div>
    );
}

export default Menu;