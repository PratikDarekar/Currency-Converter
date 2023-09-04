async function fetchCurrencies() {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
  return Object.keys(data.rates);
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("from").value;
  const toCurrency = document.getElementById("to").value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
  const data = await response.json();

  if (data.error) {
    alert("Error fetching exchange rates.");
    return;
  }

  const rate = data.rates[toCurrency];
  const result = (amount * rate).toFixed(2);

  document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
}

async function populateCurrencies() {
  const currencies = await fetchCurrencies();
  const fromCurrencySelect = document.getElementById("from");
  const toCurrencySelect = document.getElementById("to");

  currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = currency;
    option2.value = currency;
    option1.textContent = currency;
    option2.textContent = currency;
    fromCurrencySelect.appendChild(option1);
    toCurrencySelect.appendChild(option2);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateCurrencies();
});
