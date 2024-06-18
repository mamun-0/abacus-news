import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";

export function Main() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <p>&copy 2024</p>
    </div>
  );
}
