import { File, Table2 } from "lucide-react";

import { useRef, useState } from "react";
import "./../styles/uploadFile.css";

const UploadFile = ({file, setFile, setActiveBarID}) => {
    const inputRef = useRef();
    const [isActiveDropZone, setIsDropZone] = useState(false);

    const handleClickDropZone = () => {
        inputRef.current.click();
    };

    return (
        <section className="upload-container">
            <header className="upload-header">
                <h1>Загрузка данных</h1>
                <p>Выберите файл с результатами тестирования для формирования дашборда</p>
            </header>

            <div 
            className={isActiveDropZone ? "drop-zone active" : "drop-zone"} 
            onClick={handleClickDropZone}
            onDragOver={e => {
                e.preventDefault();
                setIsDropZone(true);
            }}
            onDragLeave={e => {
                e.preventDefault();
                setIsDropZone(false);
            }}
            onDrop={e => {
                e.preventDefault();
                setIsDropZone(false);
                const droppedFile = e.dataTransfer.files[0];
                if (droppedFile) {
                    setFile(droppedFile);
                }
            }}
            >
                <div className="drop-zone-content">
                    <div className="upload-icon"><File /></div>
                    <p className="drop-zone-text">Перетащите файл сюда или
                        <span className="browse-text"> выберите на компьютере</span>
                    </p>
                    <p className="file-limits">Максимальный размер файла: 10 МБ (CSV, XLSX, XLS)</p>
                </div>
                <input
                ref={inputRef}  
                type="file" 
                hidden 
                accept=".csv, .xlsx, .xls"
                onChange={e => {
                    setFile(e.target.files[0]);
                    e.target.value = "";
                }}
                />
            </div>

            {file &&
                <>
                    <div className="file-list" id="fileList">
                        <div className="file-item">
                            <div className="file-info">
                                <span className="file-icon"><Table2 /></span>
                                <div>
                                    <p className="file-name">{file.name}</p>
                                    <p className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button className="remove-btn" onClick={() => setFile(null)}>✕</button>
                        </div>
                    </div>

                    <div className="upload-actions">
                        <button className="cancel-btn" onClick={() => setFile(null)}>Отмена</button>
                        <button className="primary-btn" onClick={() => setActiveBarID(1)}>Анализировать данные</button>
                    </div>
                </>
            }
        </section>
    )
}

export default UploadFile