import { Chart } from "react-google-charts";

export const options = {
  title: "All Publisher's Approved Posts",
  is3D: true,
};

export function PiChart({ allArticles }) {
  const rawData = Object.entries(allArticles);
  const data = [["Publisher", "Posts"], ...rawData];
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
