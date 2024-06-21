import { Helmet } from "react-helmet";
import { CarouselComponent } from "../components/Carousel";

export function Home() {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <CarouselComponent />
    </div>
  );
}
