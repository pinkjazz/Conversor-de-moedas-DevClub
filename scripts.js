const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");


async function convertValues() {
    updateFromCurrencyBox();
    // Impede conversão se as moedas forem iguais
    if (fromCurrencySelect.value === toCurrencySelect.value) {
        alert('Não é possivel converter a mesma moeda');
        fromCurrencySelect.value = 'real';
        toCurrencySelect.value = 'dolar';
        updateFromCurrencyBox();
        // Atualiza imagem e nome do destino
        const currencyName = document.getElementById('currency-name');
        const currencyImg = document.querySelector('.currency-img');
        currencyName.innerHTML = 'Dólar americano';
        currencyImg.src = './assets/dollar.png';
        currencyImg.classList.remove('libra-img');
        // Atualiza valores padrão
        const currencyValueToConvert = document.querySelector('.value-to-convert');
        const currencyValueConverted = document.querySelector('.value-converted');
        currencyValueToConvert.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(0);
        currencyValueConverted.innerHTML = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(0);
        return;
    }

    const inputCurrencyValue = document.querySelector(".input-currency").value;
    const currencyValueToConvert = document.querySelector(".value-to-convert");
    const currencyValueConverted = document.querySelector(".value-converted");

    // Buscar cotações atualizadas
    const { dolarToday, euroToday, libraToday, bitcoinToday } = await getExchangeRates();

    // Exibe o valor de entrada na moeda de origem
    let fromLabel = '';
    let fromLocale = 'pt-BR';
    let fromCurrency = 'BRL';
    if (fromCurrencySelect.value === 'real') {
        fromLabel = 'R$';
        fromLocale = 'pt-BR';
        fromCurrency = 'BRL';
    } else if (fromCurrencySelect.value === 'dolar') {
        fromLabel = 'US$';
        fromLocale = 'en-US';
        fromCurrency = 'USD';
    } else if (fromCurrencySelect.value === 'euro') {
        fromLabel = '€';
        fromLocale = 'de-DE';
        fromCurrency = 'EUR';
    } else if (fromCurrencySelect.value === 'libra') {
        fromLabel = '£';
        fromLocale = 'en-GB';
        fromCurrency = 'GBP';
    } else if (fromCurrencySelect.value === 'bitcoin') {
        fromLabel = '₿';
        fromLocale = 'en-US';
        fromCurrency = 'BTC';
    }
    currencyValueToConvert.innerHTML = new Intl.NumberFormat(fromLocale, {
        style: 'currency',
        currency: fromCurrency
    }).format(inputCurrencyValue);

    // Conversão
    let valueInReal = Number(inputCurrencyValue);
    if (fromCurrencySelect.value === 'dolar') valueInReal = inputCurrencyValue * dolarToday;
    if (fromCurrencySelect.value === 'euro') valueInReal = inputCurrencyValue * euroToday;
    if (fromCurrencySelect.value === 'libra') valueInReal = inputCurrencyValue * libraToday;
    if (fromCurrencySelect.value === 'bitcoin') valueInReal = inputCurrencyValue * bitcoinToday;

    let result = 0;
    let toLocale = 'en-US';
    let toCurrency = 'USD';
    if (toCurrencySelect.value === 'real') {
        result = valueInReal;
        toLocale = 'pt-BR';
        toCurrency = 'BRL';
    } else if (toCurrencySelect.value === 'dolar') {
        result = valueInReal / dolarToday;
        toLocale = 'en-US';
        toCurrency = 'USD';
    } else if (toCurrencySelect.value === 'euro') {
        result = valueInReal / euroToday;
        toLocale = 'de-DE';
        toCurrency = 'EUR';
    } else if (toCurrencySelect.value === 'libra') {
        result = valueInReal / libraToday;
        toLocale = 'en-GB';
        toCurrency = 'GBP';
    } else if (toCurrencySelect.value === 'bitcoin') {
        result = valueInReal / bitcoinToday;
        toLocale = 'en-US';
        toCurrency = 'BTC';
    }
    currencyValueConverted.innerHTML = new Intl.NumberFormat(toLocale, {
        style: 'currency',
        currency: toCurrency
    }).format(result);
}


function changeCurrency() {
    const currencyName = document.getElementById('currency-name');
    const currencyImg = document.querySelector('.currency-img');

    // Remove a classe de tamanho especial sempre que trocar de moeda
    currencyImg.classList.remove('libra-img');

    if (currencySelect.value == 'dolar') {
        currencyName.innerHTML = 'Dólar americano';
        currencyImg.src = './assets/dollar.png';
    }

    if (currencySelect.value == 'euro') {
        currencyName.innerHTML = 'Euro';
        currencyImg.src = './assets/euro.png';
    }

    if (currencySelect.value == 'libra') {
        currencyName.innerHTML = 'Libra Esterlina';
        currencyImg.src = './assets/libra.png';
        // Adiciona a classe de tamanho especial para a libra
        currencyImg.classList.add('libra-img');
    }

    if (currencySelect.value == 'bitcoin') {
        currencyName.innerHTML = 'Bitcoin';
        currencyImg.src = './assets/bitcoin.png';
    }

    if (currencySelect.value == 'real') {
        currencyName.innerHTML = 'Real Brasileiro';
        currencyImg.src = './assets/real.png';
    }

    convertValues();
}

// Atualiza imagem e nome da moeda de origem
function updateFromCurrencyBox() {
    const fromImg = document.getElementById('from-currency-img');
    const fromName = document.getElementById('from-currency-name');
    if (!fromImg || !fromName) return;
    fromImg.classList.remove('libra-img');
    if (fromCurrencySelect.value === 'real') {
        fromImg.src = './assets/real.png';
        fromName.innerHTML = 'Real';
    } else if (fromCurrencySelect.value === 'dolar') {
        fromImg.src = './assets/dollar.png';
        fromName.innerHTML = 'Dólar Americano';
    } else if (fromCurrencySelect.value === 'euro') {
        fromImg.src = './assets/euro.png';
        fromName.innerHTML = 'Euro';
    } else if (fromCurrencySelect.value === 'libra') {
        fromImg.src = './assets/libra.png';
        fromName.innerHTML = 'Libra Esterlina';
        fromImg.classList.add('libra-img');
    } else if (fromCurrencySelect.value === 'bitcoin') {
        fromImg.src = './assets/bitcoin.png';
        fromName.innerHTML = 'Bitcoin';
    }
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", async () => { await convertValues(); });
fromCurrencySelect.addEventListener('change', updateFromCurrencyBox);

// Função para buscar a cotação atual de cada moeda em relação ao real
async function getExchangeRates() {
    const urls = {
        USD: 'https://economia.awesomeapi.com.br/json/last/USD-BRL',
        EUR: 'https://economia.awesomeapi.com.br/json/last/EUR-BRL',
        GBP: 'https://economia.awesomeapi.com.br/json/last/GBP-BRL',
        BTC: 'https://economia.awesomeapi.com.br/json/last/BTC-BRL'
    };
    const results = await Promise.all([
        fetch(urls.USD).then(r => r.json()),
        fetch(urls.EUR).then(r => r.json()),
        fetch(urls.GBP).then(r => r.json()),
        fetch(urls.BTC).then(r => r.json())
    ]);
    return {
        dolarToday: parseFloat(results[0].USDBRL.bid),
        euroToday: parseFloat(results[1].EURBRL.bid),
        libraToday: parseFloat(results[2].GBPBRL.bid),
        bitcoinToday: parseFloat(results[3].BTCBRL.bid)
    };
}