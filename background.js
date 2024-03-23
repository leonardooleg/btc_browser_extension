async function getBitcoinPrice() {
    try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
        const data = await response.json();
        return parseFloat(data.bpi.USD.rate.replace(',', '')); // Конвертація строки у число та відкидання коми
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        return 'N/A';
    }
}

async function updateBadgeText() {
    const btcPrice = await getBitcoinPrice();
    const badgeText = Math.floor(btcPrice).toString().substring(0, 3); // Отримання перших трьох цифр числа
    chrome.action.setBadgeText({ text: badgeText });
}

// Відкриття сторінки при кліку на іконку розширення
chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'https://www.blockchain.com/explorer/assets/btc' });
});

// Оновлення значення бейджа одразу після встановлення розширення
updateBadgeText();

// Оновлення значення бейджа кожні 30 хвилин
chrome.alarms.create({ periodInMinutes: 5 });
chrome.alarms.onAlarm.addListener(updateBadgeText);
