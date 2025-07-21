import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={historicalData}
      loader={<div>Loading Chart...</div>}
    />
  );
};

export default LineChart;
