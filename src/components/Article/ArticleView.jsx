import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { ArticleCard } from "./ArticleCard";
import qs from "qs";
import { Heading } from "../Heading/Heading";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
export function ArticleView() {
  const { user, loading } = useAuth();
  const [articles, setArticles] = useState([]);
  const axiosCommon = useAxios();
  const [qString, setQueryString] = useState({
    tags: "",
    title: "",
    publisher: "",
  });

  useEffect(() => {
    const filteredQueryObj = Object.fromEntries(
      Object.entries(qString).filter(([_, v]) => v !== "")
    );
    const queryString = qs.stringify(filteredQueryObj, {
      skipNulls: true,
      skipEmptyString: true,
    });
    axiosCommon
      .get(`/article?${queryString}`)
      .then(({ data }) => {
        setArticles(data);
      })
      .catch(() => {});
  }, [qString]);

  // Helper function
  function setQueryHelper(callback, key, value) {
    callback((currentQuery) => ({
      ...currentQuery,
      [key]: value,
    }));
  }
  const {
    data: premium,
    error,
    isPending,
  } = useQuery({
    queryKey: ["checkPremium"],
    queryFn: async () => {
      const { data } = await axiosCommon.post(`/checkpremium`, {
        email: user?.email,
      });
      return data.message;
    },
    enabled: !loading,
  });
  const { data: publishers = [] } = useQuery({
    queryKey: ["getpublisher"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/publisher");
      return data;
    },
  });
  if (isPending) return "Loading";
  if (error) return "Something went wrong.";
  return (
    <div>
      <Helmet>
        <title>Approved Articles</title>
      </Helmet>
      <Heading title="All Approved Articles" />
      <div className="flex justify-center p-2 sm:p-0 space-x-0 sm:space-x-2 sm:space-y-0 space-y-2 flex-col sm:flex-row">
        <select
          onChange={(e) => {
            setQueryHelper(setQueryString, "publisher", e.target.value);
          }}
        >
          <option value="">Choose Publisher</option>
          {publishers.map((publisher, idx) => {
            return <option key={idx} value={publisher.name}>{publisher.name}</option>;
          })}
        </select>
        <select
          onChange={(e) => {
            setQueryHelper(setQueryString, "tags", e.target.value);
          }}
        >
          <option value="">Choose Tags</option>
          <option value="tech">Tech</option>
          <option value="science">Science</option>
          <option value="medical">Medical</option>
          <option value="politics">Politics</option>
          <option value="war">War</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="search by heading"
          onChange={(e) => {
            setQueryHelper(setQueryString, "title", e.target.value);
          }}
        />
      </div>
      {articles.length == 0 ? (
        <h2 className="mt-4 text-xl text-red-600 text-center">Empty Article</h2>
      ) : (
        <div className="mt-7 grid gap-0 md:gap-4 grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            return (
              <ArticleCard
                key={article._id}
                {...article}
                premiumUser={premium}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
