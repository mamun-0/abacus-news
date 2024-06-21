import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../hooks/useAxios";

export function PremiumRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
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
  if (loading || isPending) return "Loading...";
  if (userRole?.message === "premium" || userRole?.message === "admin") {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return <Navigate to="/subscribe" replace="true" />;
}
