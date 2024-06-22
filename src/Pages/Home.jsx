import { Helmet } from "react-helmet";
import { CarouselComponent } from "../components/Carousel";
import { Heading } from "../components/Heading/Heading";
import { PublisherSection } from "../components/PublisherSection";

export function Home() {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <CarouselComponent />
      <Heading
        title="All The Publishers"
        subheading="Vox: Insightful coverage of politics and culture. MSNBC: Progressive commentary on current affairs. Reuters: Impartial global news and finance. Al Jazeera: Comprehensive international coverage. BBC: Extensive global news and education."
      />
      <PublisherSection />
    </div>
  );
}
