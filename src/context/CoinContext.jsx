import axios from "axios";
import React, { useEffect, useState, createContext } from "react";

export const CoinDataContext = createContext();

const CoinContext = ({ children }) => {
  const [allCoinFetchingError, setAllCoinFetchingError] = useState(false);
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  async function fetchAllCoin() {
    try {
      const api = "https://api.coinpaprika.com/v1/tickers";
      const res = await axios.get(api);
      const data = res.data;

      // Optional: Convert to match your app's structure
      const formattedData = data.map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        rank: coin.rank,
        price: coin.quotes[currency.name.toUpperCase()]?.price || 0,
        percent_change_24h:
          coin.quotes[currency.name.toUpperCase()]?.percent_change_24h || 0,
        market_cap: coin.quotes[currency.name.toUpperCase()]?.market_cap || 0,
      }));

      setAllCoin(formattedData);
    } catch (err) {
      console.error("CoinPaprika fetch error:", err);
      setAllCoinFetchingError(true);
    }
  }

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    allCoinFetchingError,
  };

  return (
    <CoinDataContext.Provider value={contextValue}>
      {children}
    </CoinDataContext.Provider>
  );
};

export default CoinContext;
