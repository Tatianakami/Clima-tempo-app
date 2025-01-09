document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('#input-localizacao');
    const sectionTempoInfo = document.querySelector('#tempo-info');

    if (!form || !input || !sectionTempoInfo) {
        console.error('Elementos obrigatórios não encontrados.');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const localizacao = input.value.trim();

        if (localizacao.length < 3) {
            alert('O local precisa ter, pelo menos, 3 letras.');
            return;
        }

        console.log('Formulário enviado. Buscando dados para:', localizacao);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(localizacao)}&appid=2ff79a3f712cf38664bd7031f59369a7&lang=pt_br&units=metric`
            );

            if (!response.ok) {
                alert('Erro ao buscar os dados. Verifique o nome da cidade.');
                console.error('Erro na resposta da API:', response.statusText);
                return;
            }

            const dados = await response.json();
            
            // Verifique os dados da API no console
            console.log(dados);

            // Exibindo as informações detalhadas sobre o clima
            sectionTempoInfo.innerHTML = `
                <div class="tempo-dados">
                    <h2>${dados.name}</h2>
                    <span>${Math.round(dados.main.temp)}°C</span> <br>
                    <span>Sensação térmica: ${Math.round(dados.main.feels_like)}°C</span> <br>
                    <span>Temperatura mínima: ${Math.round(dados.main.temp_min)}°C</span> <br>
                    <span>Temperatura máxima: ${Math.round(dados.main.temp_max)}°C</span> <br>
                    <p>Descrição: ${dados.weather[0].description.charAt(0).toUpperCase() + dados.weather[0].description.slice(1)}</p>
                    <img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png" alt="${dados.weather[0].description}"> <br>
                    <span>Velocidade do vento: ${dados.wind.speed} m/s</span> <br>
                    <span>Visibilidade: ${dados.visibility / 1000} km</span>
                </div>
            `;
        } catch (error) {
            console.error('Erro ao buscar os dados da API:', error);
            alert('Não foi possível buscar os dados. Tente novamente mais tarde.');
        }
    });
});
