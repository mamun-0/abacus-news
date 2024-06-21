import axios from "axios";
import { AddArticle } from "../components/Forms/AddArticle";
import { Heading } from "../components/Heading/Heading";
import { Helmet } from "react-helmet";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../hooks/useAxios";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

export function Article() {
  const { user } = useAuth();
  const axiosCommon = useAxios();
  const axiosSecure = useAxiosSecure();
  async function uploadPhoto(payload) {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
      payload
    );
    return data.data;
  }
  const {
    data: articleObj,
    isPending,
    error,
  } = useQuery({
    queryKey: ["limited"],
    queryFn: async () => {
      const { data: checkRole } = await axiosCommon.post("/checkpremium", {
        email: user?.email,
      });
      const { data: count } = await axiosSecure.post(
        `/article/email/${user?.email}`
      );
      return { role: checkRole.message, length: count.length };
    },
    enabled: !!user,
  });
  if (isPending) return "Loading...";
  console.log(articleObj);
  if (articleObj.role === "admin" || articleObj.role === "premium")
    return (
      <div>
        <Helmet>
          <title>Add Article</title>
        </Helmet>
        <Heading title="Create An Article" />
        <AddArticle uploadPhoto={uploadPhoto} />
      </div>
    );
  if (articleObj.role === "normal" && articleObj.length < 1)
    return (
      <div>
        <Helmet>
          <title>Add Article</title>
        </Helmet>
        <Heading title="Create An Article" />
        <AddArticle uploadPhoto={uploadPhoto} />
      </div>
    );

  return (
    <div>
      <Helmet>
        <title>Add Article</title>
      </Helmet>
      <Heading
        title="Cross The Post Limit"
        subheading="You are a normal user. Not permission to post more than one. If you want to limitless please take our subscription. "
      />
      <div className="text-center mt-4"><Link className="p-2 bg-cyan-600 text-white" to="/subscribe">Take a Subscription</Link></div>
    </div>
  );
}
