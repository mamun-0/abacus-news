import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { CheckoutForm } from "./CheckoutForm";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
export function PaymentCard({ price, closeModal, days }) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(false);
  const axiosSecure = useAxiosSecure();

  const stripePromise = loadStripe(import.meta.env.VITE_Stripe);
  useEffect(() => {
    axiosSecure
      .post("create-payment-intent", {
        price,
      })
      .then(({ data }) => {
        setClientSecret(data.clientSecret);
      })
      .catch(() => {
        setError(true);
      });
  }, []);
  return (
    <div>
      {error ? (
        "Something went wrong! Try again😥"
      ) : clientSecret ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            closeModal={closeModal}
            days={days}
          />
        </Elements>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
