import "./../styles/homePage.css"

const HomePage = ({setActiveBarID}) => {
    return (
        <>
            <section class="hero">
                <h1>Визуализируйте успеваемость в один клик</h1>
                <p>Превратите скучные таблицы с результатами тестирования в наглядные интерактивные дашборды. Начните анализировать прогресс ваших студентов прямо сейчас.</p>
            </section>

            <section class="features">
                <div class="feature-card" onClick={() => {setActiveBarID(2)}}>
                    <h3>Загрузите CSV/Excel</h3>
                    <p>Экспортируйте результаты из вашей системы обучения и перетащите их сюда.</p>
                </div>
            </section>
        </>
    )
}

export default HomePage;