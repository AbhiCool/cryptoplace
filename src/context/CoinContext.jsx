import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

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
      let api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;

      const res = await axios.get(api, {
        headers: {
          accept: "application/json",
          "x-cg-api-key": "CG-UAGkTu3XN98QJsWNtS4S3XxD",
        },
      });
      const data = res.data;
      console.log("data", data);
      setAllCoin(data);
    } catch (err) {
      console.log(err);
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
