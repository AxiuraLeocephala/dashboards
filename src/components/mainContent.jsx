import HomePage from "./homePage";
import Dashboards from "./dashboards";
import UploadFile from "./uploadFile";
import "./../styles/mainContent.css";

const MainContent = ({activeBarID, setActiveBarID, file, setFile}) => {
    const renderContent = (activeBarID) => {
        switch (activeBarID) {
            case 0: return <HomePage setActiveBarID={setActiveBarID}/>
            case 1: return <Dashboards/>
            case 2: return <UploadFile file={file} setFile={setFile}/>
        }
    }

    return (
        <div className="main-content">
            {renderContent(activeBarID)}
        </div>
    )
}

export default MainContent;