import { Helmet } from "react-helmet";
import { Publisher } from "../../components/Forms/Publisher";
import { Heading } from "../../components/Heading/Heading";

export function PublisherPage() {
  return (
    <div>
      <Helmet>
        <title>Publisher</title>
      </Helmet>
      <Heading title="Add Publisher" />
      <Publisher />
    </div>
  );
}
