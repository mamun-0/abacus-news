import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Heading } from "../../components/Heading/Heading";
import { UsersTable } from "../../components/Dashboard/usersTable";
import { Helmet } from "react-helmet";
import { DataLoading } from "../../components/Loading/DataLoading";

export function Users() {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/user");
      return data;
    },
  });
  if (isPending) return <DataLoading />;
  if (error) return "Something went wrong";
  async function handleAdmin(id) {
    return axiosSecure.put(`/user/admin/${id}`);
  }
  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Heading
        title="All Users Dashboard"
        subheading={`Total users : ${users.length}`}
      />
      <UsersTable users={users} handleAdmin={handleAdmin} refetch={refetch} />
    </div>
  );
}
