import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinDataContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [input, setInput] = useState("");
  const { allCoin, currency, allCoinFetchingError } =
    useContext(CoinDataContext);

  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDisplayCoin(
      allCoin.filter((coin) =>
        coin.name.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const handleCryptoSearch = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  console.log("displayCoin", displayCoin);
  return (
    <div className="home py-[0px] px-[10px] pb-[100px]">
      <div className="hero max-w-[600px] mx-auto my-[80px] flex flex-col items-center text-center gap-[30px]">
        <h1 className="text-4xl font-semibold">
          Largest <br />
          Crypto Marketplace
        </h1>
        <p className="w-[75%] text-[#e3e3e3] leading-[1.5]">
          Welcome to the largest crypto marketplace. Sign up to explore more
          cryptos.
        </p>
        <form
          onSubmit={handleFormSubmit}
          className="p-[8px] w-[80%] md:bg-white rounded-[5px] text-[20px] flex justify-between items-center gap-[10px] flex-col md:flex-row"
        >
          <input
            type="text"
            placeholder="Search coin..."
            className="flex-1 text-[16px] outline-none border-none md:p-0 p-2 pl-[10px] text-black rounded-lg "
            value={input}
            onChange={handleCryptoSearch}
            required
            list="coinlist"
          />
          <datalist id="coinlist">
            {allCoin.map((coin, index) => (
              <option key={index}>{coin.name}</option>
            ))}
          </datalist>
          <button
            type="submit"
            className="border-none bg-[#7927ff] text-[16px] py-[10px] px-[30px] rounded-[5px] text-white cursor-pointer"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="input-table max-w-[800px] m-auto bg-gradient-to-r from-[rgba(84,3,255,0.15)] to-[rgba(105,2,153,0.15)] rounded-[15px]">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="text-right hidden sm:block">Market Cap</p>
        </div>

        {!allCoin.length && !allCoinFetchingError && <Spinner />}

        {allCoinFetchingError ? (
          <div className="text-center text-[orange] p-2">
            <p>Error occurred while fetching coin data.</p>
            <p>Please try again later.</p>
          </div>
        ) : (
          displayCoin.slice(0, 10).map((coin, index) => (
            <Link
              to={`/coin/${coin.id}`}
              key={coin.id}
              className="table-layout"
            >
              <p>{coin.rank}</p>
              <div className="flex items-center gap-[10px]">
                <img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  className="w-[35px] h-[35px]"
                  alt=""
                />
                <p>{coin.name}</p>
              </div>
              <p>
                {currency.symbol} {coin.price.toLocaleString(2)}
              </p>
              <p
                className={`text-center ${
                  coin.percent_change_24h < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {coin.percent_change_24h.toFixed(2)}%
              </p>
              <p className="text-right hidden sm:block">
                {currency.symbol} {coin.market_cap.toLocaleString()}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
