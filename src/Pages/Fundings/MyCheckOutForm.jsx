
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const MyCheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState("");
  const [money, setMoney] = useState("$30")

  const resetCardForm = () => {
    if (elements) {
      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);
      if (cardNumberElement && cardExpiryElement && cardCvcElement) {
        cardNumberElement.clear();
        cardExpiryElement.clear();
        cardCvcElement.clear();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()


    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      console.log("payment error : ", error);
      setErr(error.message);
    } else {
      console.log("payment method : ", paymentMethod);
      setErr("");
      resetCardForm() 

      axios.post("/funding", {money})        // have to add backend
      .then(res=>console.log(res))

      Swal.fire({
        title: "Thanks for the donation",
        icon: "success"
      });

    }
  };

  return (
    <div className="w-80 md:w-96 mx-auto  p-10">
      <div className="my-20 border-2 shadow-xl rounded-lg p-10 text-xl">
        <form onSubmit={handleSubmit}>
          <div>
            <select onChange={(e)=>setMoney(e.target.value)} className="px-4 py-2 mt-2 my-5 border-2 w-full" >
              <option value="$30">$30</option>
              <option value="$50">$50</option>
              <option value="$100">$100</option>
              <option value="$500">$500</option>
              <option value="$1000">$1000</option>
            </select>
          </div>
          <div>
            <label>Card Number</label>
            <CardNumberElement className="px-4 py-2 mt-2 my-5 border-2" />
          </div>
          <div>
            <label>Expiration Date</label>
            <CardExpiryElement  className="px-4 py-2 mt-2 my-5 border-2" />
          </div>
          <div>
            <label>CVC</label>
            <CardCvcElement  className="px-4 py-2 mt-2 my-5 border-2" />
          </div>
          <button className="cursor-pointer mt-4  h-10 bg-red-600 px-10 text-white text-lg rounded-sm hover:rounded-xl active:bg-slate-300 active:text-red-600 active:border-[1px] active:border-red-600"
          type="submit" 
          disabled={!stripe}>
            Donate
          </button>
        </form>
        <p>{err}</p>
      </div>
    </div>
  );
};

export default MyCheckOutForm;

