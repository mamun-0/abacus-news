import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { PremiumArticleCard } from "../components/PremiumArticleCard";
import { Heading } from "../components/Heading/Heading";
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
  console.log(premium);
  if (isPending) return "Loading";
  if (error) return "Something went wrong.";
  return (
    <div>
      <Heading title="All Premium Articles" />
      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
        {premium.message.map((item, idx) => {
          return <PremiumArticleCard key={idx} {...item} />;
        })}
      </div>
    </div>
  );
}
