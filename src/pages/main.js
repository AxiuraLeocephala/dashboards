import { useState } from "react";
import Sidebar from "../components/sidebar";
import MainContent from "../components/mainContent";
import "./../styles/main.css";

function Main () {
    const [activeBarID, setActiveBarID] = useState(1);
    const bars = [
        {id: 0, title: "Домашняя", position: "top"},
        {id: 1, title: "Дашборды", position: "top"},
        {id: 2, title: "Загрузить файл", position: "buttom"},
    ];
    const [file, setFile] = useState(null);
    
    return (
        <div className="main">
            <Sidebar bars={bars} activeBarID={activeBarID} setActiveBarID={setActiveBarID}/>
            <MainContent
            activeBarID={activeBarID}
            setActiveBarID={setActiveBarID}
            file={file}
            setFile={setFile}
            />
        </div>
    )
}

export default Main