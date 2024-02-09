import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import MyCheckOutForm from "./MyCheckOutForm"


// use env
const myStripePromise = loadStripe('pk_test_51OKMTPAZvFE3lOV4Q0U6TVUVCscTAoeLIIJ8UONTNGniaanv8wqEXUAjbyjHD7kMXEGwipAYB02WkyA8kqd3nUBA00RysKRHUV')

const Funding = () => {
  return (
    <div>
      <Elements stripe={myStripePromise}>
        <MyCheckOutForm/>
      </Elements>
    </div>
  )
}

export default Funding