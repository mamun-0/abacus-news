import React from "react";
import { Chart } from "react-google-charts";

const options = {
  chart: {
    title: "Publisher's Total Approved Posts",
  },
};

export function BarChart({ allArticles }) {
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
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
