import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { DataLoading } from "../components/Loading/DataLoading";

export function PremiumRoute({ children }) {
  const { user, loading } = useAuth();
  const axiosCommon = useAxios();
  const {
    data: userRole,
    isPending,
    error,
  } = useQuery({
    queryKey: ["premium", "admin"],
    queryFn: async () => {
      const { data } = await axiosCommon.post("/checkpremium", {
        email: user?.email,
      });
      return data;
    },
    enabled: !loading,
  });
  if (loading || isPending) return <DataLoading />;
  if (userRole?.message === "premium" || userRole?.message === "admin") {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return <Navigate to="/subscribe" replace="true" />;
}
