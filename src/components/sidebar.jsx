import "./../styles/sidebar.css";

const Sidebar = ({bars, activeBarID, setActiveBarID}) => {
    const barsTop = bars.filter(bar => bar.position === "top");
    const barsButtom = bars.filter(bar => bar.position === "buttom");

    return (
        <div className="sidebar">
            <h2 className="label">
                Untitled UI
            </h2>
            <nav className="nav-top">
                {barsTop.map((bar, index) => (
                    <button 
                    key={index}
                    className={activeBarID === bar.id ? "active" : ""} 
                    onClick={() => setActiveBarID(bar.id)
                    }>
                        {bar.title}
                    </button>
                ))}
            </nav>
            <nav className="nav-buttom">
                {barsButtom.map((bar, index) => (
                    <button 
                    key={index}
                    className={activeBarID === bar.id ? "active" : ""}
                    onClick={() => setActiveBarID(bar.id)
                    }>
                        {bar.title}
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar;