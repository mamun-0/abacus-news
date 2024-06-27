import { useEffect, useState } from "react";
import { SubscriptionCard } from "../components/SubscriptionCard/SubscriptionCard";
import axios from "axios";
import { Heading } from "../components/Heading/Heading";
import { Banner } from "../components/Payment/Banner";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { DataLoading } from "../components/Loading/DataLoading";

export function Subscribe() {
  const [filtered, setFiltered] = useState([]);
  const [subscription, setSubscription] = useState(0);

  const {
    data: cards = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const { data } = await axios.get("/premiumcard.json");
      return data;
    },
  });

  // Filter cards based on subscription
  useEffect(() => {
    const filterObj = cards.filter((card) => {
      return card.days === subscription;
    });
    setFiltered(filterObj);
  }, [subscription, cards]);

  const showCards = filtered.map((item) => {
    return <SubscriptionCard key={item.id} {...item} />;
  });

  if (isPending) return <DataLoading />;
  if (error) return "Something went worong";

  return (
    <div>
      <Helmet>
        <title>Subscribe</title>
      </Helmet>
      <Banner />
      <Heading title="Be A Premium User" />
      <div className="flex justify-center my-7">
        <select
          name="subscription"
          className="text-xl font-mono"
          onChange={(event) => {
            setSubscription(parseInt(event.target.value));
          }}
        >
          <option value="0">Choose subscription</option>
          <option value="5">Only for 5 days</option>
          <option value="10">Only for 10 days</option>
        </select>
      </div>
      <div className="my-4 grid justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length ? (
          showCards
        ) : (
          <div className="text-center col-span-12 text-lg">
            No general subscription cards are available. Please choose option
            above 👆
          </div>
        )}
      </div>
    </div>
  );
}
