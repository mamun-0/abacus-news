import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Spinner } from "flowbite-react";

export const CheckoutForm = ({ clientSecret, closeModal, days }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    const { paymentIntent, error: paymentIntentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.email || "Anonymous",
          },
        },
      });

    if (error) {
    } else {
    }
    if (paymentIntentError) {
    } else {
      axiosSecure
        .post("/premium", { days, email: user?.email })
        .then(({ data }) => {
        });
      toast.success("Payment successfully");
    }
    setLoading(false);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
        onChange={(event) => {
          setComplete(event.complete);
        }}
      />
      {loading ? (
        <Spinner aria-label="Small spinner example" size="sm" />
      ) : (
        <button
          disabled={!stripe || !clientSecret || !complete}
          className="mt-3 py-1 px-3 inline-flex items-center gap-x-2 text-sm font-semibold  border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Pay
        </button>
      )}
    </form>
  );
};
