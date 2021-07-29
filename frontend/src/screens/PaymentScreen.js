import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/CartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentScreen = ({ history }) => {
   const cart = useSelector((state) => state.cart);
   const { shippingAddress } = cart;

   if (!shippingAddress) {
      history.push("/shipping");
   }

   const [paymentMethod, setPaymentMethod] = useState("paystack");

   const dispatch = useDispatch();

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      history.push("/placeorder");
   };

   return (
      <FormContainer>
         <CheckoutSteps step1 step2 step3 />
         <h1>Payment</h1>
         <br />
         <Form onSubmit={submitHandler}>
            <Form.Group>
               <Form.Label as="legend">Select Payment Method</Form.Label>
               <Col>
                  <Form.Check
                     type="radio"
                     label="ATM card"
                     value="paystack"
                     id="paystack"
                     name="paymentMethod"
                     checked
                     onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
               </Col>
            </Form.Group>
            <br />

            <Button className="mt-4" type="submit" variant="primary">
               Continue
            </Button>
         </Form>
      </FormContainer>
   );
};

export default PaymentScreen;
