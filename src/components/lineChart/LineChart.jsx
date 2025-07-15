import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);
  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];

    if (historicalData?.prices) {
      for (let i = 0; i < historicalData.prices.length; i++) {
        dataCopy.push([
          new Date(historicalData.prices[i][0])
            .toLocaleDateString()
            .slice(0, -5),
          historicalData.prices[i][1],
        ]);
      }
      console.log("dataCopy", dataCopy);
      setData(dataCopy);
    }
  }, [historicalData]);

  return <Chart chartType="LineChart" width="100%" height="100%" data={data} />;
};

export default LineChart;
