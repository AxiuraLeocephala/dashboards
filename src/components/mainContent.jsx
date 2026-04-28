import HomePage from "./homePage";
import Dashboards from "./dashboards";
import UploadFile from "./uploadFile";
import "./../styles/mainContent.css";

const MainContent = ({activeBarID, setActiveBarID}) => {
    const renderContent = (activeBarID) => {
        switch (activeBarID) {
            case 0: return <HomePage setActiveBarID={setActiveBarID}/>
            case 1: return <Dashboards/>
            case 2: return <UploadFile/>
        }
    }

    return (
        <div className="main-content">
            {renderContent(activeBarID)}
        </div>
    )
}

export default MainContent;