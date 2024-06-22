import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { ModalAfter10Sec } from "../components/ModalAfter10Sec";
import { FooterComponent } from "../components/Footer/FooterComponent";

export function Main() {
  return (
    <div>
      <ModalAfter10Sec />
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
}
