import { PaymentModal } from "../Payment/PaymentModal";

export function SubscriptionCard({ features, price, days }) {
  return (
    <div className="max-w-xs flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:border-t-blue-500 dark:shadow-neutral-700/70">
      <div className="p-4 md:p-5">
        <h3 className="my-3 text-center text-lg font-bold text-gray-800 dark:text-white">
          Get Premium Features
        </h3>
        <ul className="divide-y space-y-2">
          {features.map((feature, idx) => {
            return <li key={idx}>{feature}</li>;
          })}
        </ul>
      </div>
      <PaymentModal price={price} days={days} />
    </div>
  );
}
