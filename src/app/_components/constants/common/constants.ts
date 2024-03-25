const symbols = [
  "BTCUSDT",
  "ETHUSDT",
  "LTCUSDT",
  "DOGEUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "BNBUSDT",
  "MATICUSDT",
  "ADAUSDT",
  "DOTUSDT",
  "AVAXUSDT",
  "LINKUSDT",
  "UNIUSDT",
  "TRXUSDT",
];

// https://api.binance.com/api/v3/ticker/price?symbols=${symbols}

export const Constants = {
  crypto_api: `https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","LTCUSDT","DOGEUSDT","SOLUSDT","XRPUSDT","BNBUSDT","MATICUSDT","ADAUSDT","DOTUSDT","AVAXUSDT","LINKUSDT","UNIUSDT","TRXUSDT"]`,
};

// "https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Ccardano%2Csolana%2Cdogecoin%2Cpolkadot%2Cmatic-network%2Cavalanche-2%2Cuniswap%2Ctron%2Clitecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false",
