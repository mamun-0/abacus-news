import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Dashboard/Sidebar";

export function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <div className="md:w-1/5">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-x-scroll">
        <Outlet />
      </div>
    </div>
  );
}
