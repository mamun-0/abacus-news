import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { ModalAfter10Sec } from "../components/ModalAfter10Sec";

export function Main() {
  return (
    <div>
      <ModalAfter10Sec />
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <p>&copy 2024</p>
    </div>
  );
}
