import "./Error404.css";
import { Helmet } from "react-helmet";
export function Error404() {
  return (
    <div className="height-100vh relative">
      <Helmet>
        <title>Page Not found!</title>
      </Helmet>
      <div className="height-50 bg-sky"></div>
      <div className="flex absolute place-center">
        <img src="/text404.png" alt="" />
        <img src="/cat404.png" alt="" />
      </div>
      <div className="height-50 bg-desert"></div>
    </div>
  );
}
