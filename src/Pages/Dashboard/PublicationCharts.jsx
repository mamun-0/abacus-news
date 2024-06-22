import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { PiChart } from "../../components/Dashboard/PiChart";
import { BarChart } from "../../components/Dashboard/BarChart";
import { AreaChart } from "../../components/Dashboard/AreaChart";
import { Heading } from "../../components/Heading/Heading";

export function PublicationCharts() {
  const axiosSecure = useAxiosSecure();
  const {
    data: allArticles,
    error,
    isPending,
  } = useQuery({
    queryKey: ["charts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/approvedArticles");
      const result = countArticlesByPublisher(data);
      return result;
    },
  });
  function countArticlesByPublisher(articles) {
    return articles.reduce((acc, article) => {
      acc[article.publisher] = (acc[article.publisher] || 0) + 1;
      return acc;
    }, {});
  }
  if (isPending) return "Loading";
  if (error) return "Something went wrong";
  return (
    <div>
      <Heading
        title="Pie, Bar & Area Charts"
        subheading="Showing Three different charts to visualize total approved posts by Admin"
      />
      <PiChart allArticles={allArticles} />
      <BarChart allArticles={allArticles} />
      <AreaChart allArticles={allArticles} />
    </div>
  );
}
