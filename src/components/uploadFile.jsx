import "./../styles/uploadFile.css";

const UploadFile = () => {
    return (
        <section class="upload-container">
            <header class="upload-header">
                <h1>Загрузка данных</h1>
                <p>Выберите файл с результатами тестирования для формирования дашборда</p>
            </header>

            <div class="drop-zone" id="dropZone">
                <div class="drop-zone-content">
                    <div class="upload-icon">📄</div>
                    <p class="drop-zone-text">Перетащите файл сюда или
                        <span class="browse-text"> выберите на компьютере</span>
                    </p>
                    <p class="file-limits">Максимальный размер файла: 10 МБ (CSV, XLSX, XLS)</p>
                </div>
                <input type="file" id="fileInput" hidden accept=".csv, .xlsx, .xls"/>
            </div>

            <div class="file-list" id="fileList">
                <div class="file-item">
                    <div class="file-info">
                        <span class="file-icon">📊</span>
                        <div>
                            <p class="file-name">results_2023.xlsx</p>
                            <p class="file-size">1.2 MB</p>
                        </div>
                    </div>
                    <button class="remove-btn">✕</button>
                </div>
            </div>

            <div class="preview-section">
                <h4>Предварительный просмотр структуры</h4>
                <div class="preview-table-wrapper">
                    <table class="preview-table">
                        <thead>
                            <tr>
                                <th>Студент</th>
                                <th>ID Теста</th>
                                <th>Балл</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Иванов Иван</td>
                                <td>T-001</td>
                                <td>85</td>
                                <td>12.10.2023</td>
                            </tr>
                            <tr class="placeholder-row">
                                <td colspan="4">Данные появятся после выбора файла...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="upload-actions">
                <button class="cancel-btn">Отмена</button>
                <button class="primary-btn" id="analyzeBtn" disabled>Анализировать данные</button>
            </div>
        </section>
    )
}

export default UploadFile