import { House, LayoutDashboard, Upload } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import MainContent from "../components/mainContent";
import "./../styles/main.css";

function Main () {
    const [activeBarID, setActiveBarID] = useState(2);
    const bars = [
        {id: 0, icon: <House/>, title: "Домашняя", position: "top"},
        {id: 1, icon: <LayoutDashboard/>, title: "Дашборды", position: "top"},
        {id: 2, icon: <Upload/>, title: "Загрузить файл", position: "buttom"},
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