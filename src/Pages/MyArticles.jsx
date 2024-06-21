import { ArticleTable } from "../components/Article/Table";
import { Heading } from "../components/Heading/Heading";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { useAuth } from "../hooks/useAuth";
import { Helmet } from "react-helmet";

export function MyArticles() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["myarticles"],
    queryFn: () => {
      return axiosSecure.post("/myarticles", { email: user?.email });
    },
    enabled: !!user?.email,
  });
  if (isPending) return "Loading...";
  if (error) return "Something went wrong!";

  return (
    <div>
      <Helmet>
        <title>My Articles</title>
      </Helmet>
      <Heading title="My Articles" />
      <ArticleTable data={data.data.message} refetch={refetch} />
    </div>
  );
}
