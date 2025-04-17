function Menu() {
    return (  
        <div style={{
            color: "white",
            background: "#5F805F",
            padding: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
        }}>
            <h1>Work2sell</h1>
            <img src="https://placehold.co/80"/>
            <button>Logout</button>
        </div>
    );
}

export default Menu;