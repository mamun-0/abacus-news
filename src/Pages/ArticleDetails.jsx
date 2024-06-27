import { useParams } from "react-router-dom";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { ArticleDetailsCard } from "../components/Article/ArticleDetailsCard";
import { useQuery } from "@tanstack/react-query";
import { Heading } from "../components/Heading/Heading";
import { Helmet } from "react-helmet";
import { DataLoading } from "../components/Loading/DataLoading";

export function ArticleDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    error,
    data: item,
  } = useQuery({
    queryKey: ["articleDetails"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/article/${id}`);
      return data;
    },
  });
  if (isPending) return <DataLoading />;
  if (error) return "Something went wrong!";
  return (
    <div>
      <Helmet>
        <title>Articles Details</title>
      </Helmet>
      <Heading title="Article Details" />
      <div className="flex justify-center">
      <ArticleDetailsCard {...item} />
      </div>
    </div>
  );
}
