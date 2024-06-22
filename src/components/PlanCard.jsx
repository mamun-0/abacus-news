import { Card } from "flowbite-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function PlanCard() {
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/premiumcard.json")
      .then(({ data }) => {
        setPlan(data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return "Loading";
  return (
    <div className="mt-4 mx-2 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
      {plan.map((item) => {
        return (
          <Card key={item.id} className="w-3/4 place-self-center">
            <h5 className="mb-2 text-xl font-medium text-gray-500 dark:text-gray-400">
              {item.name}
            </h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">
                {item.price}
              </span>
              <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                /month
              </span>
            </div>
            <ul className="my-4 space-y-3">
              {item.features.map((feature, idx) => {
                return (
                  <li key={idx} className="flex space-x-2">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {feature}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="text-center"><Link to="/subscribe" className="p-2 text-white bg-cyan-500 rounded-md">Subscribe Now</Link></div>
          </Card>
        );
      })}
    </div>
  );
}
