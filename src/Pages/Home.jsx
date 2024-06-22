import { Helmet } from "react-helmet";
import { CarouselComponent } from "../components/Carousel";
import { Heading } from "../components/Heading/Heading";
import { PublisherSection } from "../components/PublisherSection";
import { StatisticSection } from "../components/StatisticSection";
import { PlanCard } from "../components/PlanCard";

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
      <Heading title="Statistic" />
      <StatisticSection />
      <Heading
        title="Plan"
        subheading="Normal user can post only one. Premium user can post unlimited."
      />
      <PlanCard />
    </div>
  );
}
