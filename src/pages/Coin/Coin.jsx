import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinDataContext } from "../../context/CoinContext";
import LineChart from "../../components/lineChart/LineChart";
import Spinner from "../../components/Spinner/Spinner";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  const { currency } = useContext(CoinDataContext);

  useEffect(() => {
    getCoinData();
    getHistoricalData();
  }, [currency]);

  async function getCoinData() {
    const url = "https://api.coingecko.com/api/v3/coins/" + coinId;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-api-key": "CG-UAGkTu3XN98QJsWNtS4S3XxD",
      },
    };

    try {
      let res = await fetch(url, options);
      res = await res.json();
      console.log(res);
      setCoinData(res);
    } catch (err) {
      // console.log(err);
    }
  }

  async function getHistoricalData() {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-api-key": "CG-UAGkTu3XN98QJsWNtS4S3XxD",
      },
    };

    try {
      let res = await fetch(url, options);
      res = await res.json();
      setHistoricalData(res);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  }
  // console.log(coinId);
  if (loadingError) {
    return (
      <div className="flex flex-col gap-[10px] items-center justify-center min-h-[70vh] font-[500] text-[20px] text-[orange]">
        <p className="">Error occured while fetching coins data.</p>
        <p className="">Please try after some time</p>
      </div>
    );
  }
  if (coinData && historicalData) {
    return (
      <div className="coin py-[0px] px-[20px]">
        <div className="coin-name flex flex-col gap-[20px] items-center my-[100px] mx-auto mb-[50px]">
          <img src={coinData?.image?.large} alt="" className="max-w-[100px]" />
          <p className="font-[500] text-[44px]">
            {coinData?.name}({coinData?.symbol?.toUpperCase()})
          </p>
        </div>
        <div className="coin-chart max-w-[600px] m-auto h-[250px]">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info flex flex-col max-w-[600px] my-[50px] mx-auto">
          <ul className="">
            <li>Crypto Market Rank</li>
            <li>{coinData?.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}{" "}
              {coinData?.market_data?.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData?.market_data?.market_cap[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}{" "}
              {coinData?.market_data?.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}{" "}
              {coinData?.market_data?.low_24h[currency.name].toLocaleString()}
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
