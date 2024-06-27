import { useQuery } from "@tanstack/react-query";
import { ArticleTable } from "../../components/Dashboard/articleTable";
import { Heading } from "../../components/Heading/Heading";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { DataLoading } from "../../components/Loading/DataLoading";
export function AllArticle() {
  const axiosSecure = useAxiosSecure();
  async function handleUpdate(id, queryText, payload) {
    const url = `/user/admin/permission/${id}?update=${queryText}`;
    return axiosSecure.put(url, payload);
  }
  const {
    data: allUsers,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["AllArticle"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/user/admin/users");
      return data;
    },
  });
  if (isPending) return <DataLoading />;
  if (error) return "Something went wrong";
  return (
    <div className="space-y-2">
      <Helmet>
        <title>All Articles</title>
      </Helmet>
      <Heading
        title="All Article"
        subheading={`Total Posts : ${allUsers.length}`}
      />
      {allUsers.map((user, idx) => {
        return (
          <ArticleTable
            key={user._id}
            idx={idx}
            {...user}
            handleUpdate={handleUpdate}
            refetch={refetch}
          />
        );
      })}
    </div>
  );
}
