import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { Helmet } from "react-helmet";

export function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="md:w-1/5">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-x-scroll">
        <Outlet />
      </div>
    </div>
  );
}
