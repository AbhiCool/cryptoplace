import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinDataContext } from "../../context/CoinContext";
import LineChart from "../../components/lineChart/LineChart";
import Spinner from "../../components/Spinner/Spinner";

const Coin = () => {
  const { coinId } = useParams(); // Example: btc-bitcoin
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  const { currency } = useContext(CoinDataContext);

  useEffect(() => {
    getCoinData();
    getHistoricalData();
  }, [coinId, currency]);

  async function getCoinData() {
    try {
      const res = await fetch(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      );
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  }

  async function getHistoricalData() {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    try {
      const res = await fetch(
        `https://api.coinpaprika.com/v1/tickers/${coinId}/historical?start=${startDate}&end=${endDate}&interval=1d`
      );
      const data = await res.json();

      console.log("historicalData", data);
      const newData = data.map((item) => {
        return [new Date(item.timestamp), item.price];
      });

      newData.unshift(["Date", "Prices"]);
      console.log("newData", newData);
      setHistoricalData(newData);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  }

  if (loadingError) {
    return (
      <div className="flex flex-col gap-[10px] items-center justify-center min-h-[70vh] font-[500] text-[orange] text-[20px]">
        <p>Error occurred while fetching coin data.</p>
        <p>Please try after some time</p>
      </div>
    );
  }

  if (coinData && historicalData) {
    return (
      <div className="coin py-[0px] px-[20px]">
        <div className="coin-name flex flex-col gap-[20px] items-center my-[100px] mx-auto mb-[50px]">
          <img
            src={`https://cryptocurrencyliveprices.com/img/${coinId}.png`}
            alt=""
            className="max-w-[100px]"
          />
          <p className="font-[500] text-[44px]">
            {coinData.name} ({coinData.symbol})
          </p>
        </div>
        <div className="coin-chart max-w-[600px] m-auto h-[250px]">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info flex flex-col max-w-[600px] my-[50px] mx-auto">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol} {coinData.quotes?.USD?.price.toFixed(2)}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.quotes?.USD?.market_cap.toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}{" "}
              {coinData.quotes?.USD?.ath_price?.toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return <Spinner height="min-h-80" />;
  }
};

export default Coin;
