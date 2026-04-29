import { useRef, useState } from "react";
import "./../styles/uploadFile.css";

const UploadFile = () => {
    const inputRef = useRef();
    const [file, setFile] = useState(null);
    const [isActiveDropZone, setIsDropZone] = useState(false);

    const handleClickDropZone = () => {
        inputRef.current.click();
    };

    return (
        <section class="upload-container">
            <header class="upload-header">
                <h1>Загрузка данных</h1>
                <p>Выберите файл с результатами тестирования для формирования дашборда</p>
            </header>

            <div 
            class={isActiveDropZone ? "drop-zone active" : "drop-zone"} 
            onClick={handleClickDropZone}
            // onDragOver={setIsDropZone(true)}
            // onDrop={() => {
            //     setIsDropZone(false);
            //     handleClickDropZone();
            // }}
            >
                <div class="drop-zone-content">
                    <div class="upload-icon">📄</div>
                    <p class="drop-zone-text">Перетащите файл сюда или
                        <span class="browse-text"> выберите на компьютере</span>
                    </p>
                    <p class="file-limits">Максимальный размер файла: 10 МБ (CSV, XLSX, XLS)</p>
                </div>
                <input
                ref={inputRef}  
                type="file" 
                hidden 
                accept=".csv, .xlsx, .xls"
                onChange={e => setFile(e.target.files[0])}
                />
            </div>

            {file &&
                <>
                    <div class="file-list" id="fileList">
                        <div class="file-item">
                            <div class="file-info">
                                <span class="file-icon">📊</span>
                                <div>
                                    <p class="file-name">{file.name}</p>
                                    <p class="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button class="remove-btn">✕</button>
                        </div>
                    </div>

                    <div class="upload-actions">
                        <button class="cancel-btn">Отмена</button>
                        <button class="primary-btn" id="analyzeBtn" disabled>Анализировать данные</button>
                    </div>
                </>
            }
        </section>
    )
}

export default UploadFile