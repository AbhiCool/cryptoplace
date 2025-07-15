import React, { useContext } from "react";
import "./Navbar.css";

import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { CoinDataContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { currency, setCurrency } = useContext(CoinDataContext);
  const handleOnChange = (e) => {
    console.log(e, e.target.value);
    switch (e.target.value) {
      case "usd":
        setCurrency({ ...currency, name: e.target.value, symbol: "$" });
        break;
      case "euro":
        setCurrency({ ...currency, name: e.target.value, symbol: "€" });
        break;
      case "inr":
        setCurrency({ ...currency, name: e.target.value, symbol: "₹" });
        break;
      default:
        setCurrency({ ...currency, name: e.target.value, symbol: "$" });
        break;
    }
  };
  return (
    <div
      className="navbar flex items-center justify-between 
    py-[20px] 
    md:px-[%] sm:px-[8%] px-[5%] 

    text-[#ddd] border-b-[2px] border-[#3c3c3c]"
    >
      <Link to="/">
        <img src={logo} alt="" className="logo w-[max(12vw,120px)]" />
      </Link>

      <ul className="gap-[40px] list-none md:flex hidden">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right flex  items-center " style={{ gap: "20px" }}>
        <select
          className="text-white px-[5px] py-[8px] rounded-[6px] border-[2px] border-[white] bg-[transparent]"
          name="currency"
          id=""
          onChange={handleOnChange}
        >
          <option value="usd">USD</option>
          <option value="euro">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button className="flex items-center gap-[8px] sm:gap-[10px] py-[8px] sm:py-[10px] px-[18px] sm:px-[25px] rounded-[20px] text-[14px] sm:text-[15px] font-[500] text-[#393939] bg-white border-none cursor-pointer">
          Sign up
          <img src={arrow_icon} alt="" className="w-[13px]" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
