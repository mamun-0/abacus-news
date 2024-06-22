import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Publisher's Total Approved Posts",
  hAxis: { title: 'Publisher' },
  vAxis: { title: 'Total Approved Posts', minValue: 0 },
  legend: { position: 'bottom' },
  areaOpacity: 0.2,
  lineWidth: 2,
  colors: ['#1c91c0'],
};

export function AreaChart({ allArticles }) {
  let data;  
  if (Array.isArray(allArticles)) {
    data = [["Publisher", "Total Approved Posts"], ...allArticles];
  } else if (typeof allArticles === "object" && allArticles !== null) {
    const rawData = Object.entries(allArticles);
    data = [["Publisher", "Total Approved Posts"], ...rawData];
  } else {
    throw new Error("allArticles must be an array or an object");
  }
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
