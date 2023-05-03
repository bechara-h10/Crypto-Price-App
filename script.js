const URL = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Cdogecoin&vs_currencies=usd&include_24hr_change=true`

async function getCoinsInfo() {
  const response = await fetch(URL)
  const data = await response.json()
  return data
}

async function printCoins() {
  const coinsData = await getCoinsInfo()
  const coinsNames = Object.getOwnPropertyNames(coinsData)
  const coinsContainer = $('.coins-container')
  coinsNames.forEach((coin) => {
    coinsContainer.append(`
        <div class="coin-container ${
          coinsData[coin].usd_24h_change < 0 ? 'falling' : 'rising'
        }">
            <div class="coin-logo"><img src="images/${coin}.png"></div>
            <div class="coin-name"><h3>${coin}</h3> <p>/USD</p></div>
            <div class="coin-price-info"><h3>$${
              coinsData[coin].usd
            }</h3> <p>${parseFloat(
      coinsData[coin].usd_24h_change.toFixed(6)
    )}</p></div>
        </div>
    `)
  })
}

printCoins()
