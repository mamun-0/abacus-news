import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { PremiumArticleCard } from "../components/Article/PremiumArticleCard";
import { Heading } from "../components/Heading/Heading";
import { Helmet } from "react-helmet";
export function Premium() {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    error,
    data: premium = [],
  } = useQuery({
    queryKey: ["premiumArticles"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/premium");
      return data;
    },
  });
  if (isPending) return "Loading";
  if (error) return "Something went wrong.";
  return (
    <div>
      <Helmet>
        <title>Premium</title>
      </Helmet>
      <Heading title="All Premium Articles" />
      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
        {premium.message.map((item, idx) => {
          return <PremiumArticleCard key={idx} {...item} />;
        })}
      </div>
    </div>
  );
}
