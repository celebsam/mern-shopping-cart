import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
   const cart = useSelector((state) => state.cart);
   const dispatch = useDispatch();

   //  calc prices
   cart.itemsPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
   );

   cart.shippingPrice = cart.itemsPrice > 1000 ? 0 : 100;

   cart.taxPrice = +(0.15 * cart.itemsPrice).toFixed(2);

   cart.totalPrice = +(cart.itemsPrice + cart.shippingPrice + cart.taxPrice);

   const orderCreate = useSelector((state) => state.orderCreate);

   const { order, success, error } = orderCreate;
   useEffect(() => {
      if (success) {
         history.push(`/order/${order._id}`);
      }
      // eslint-disable-next-line
   }, [history, success]);

   const placeOrderHandler = () => {
      dispatch(
         createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
         })
      );
   };
   return (
      <>
         <CheckoutSteps step1 step2 step3 step4 />
         <Row>
            <Col md={8}>
               <ListGroup variant="flush">
                  <ListGroup.Item>
                     <h2>Shipping</h2>
                     <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address},{" "}
                        {cart.shippingAddress.city},{" "}
                        {cart.shippingAddress.postalCode},{" "}
                        {cart.shippingAddress.country}
                     </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2>Payment Mehtod</h2>
                     <p>
                        {" "}
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                     </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2>Order Items</h2>
                     {cart.cartItems.length === 0 ? (
                        <Message>Your cart is empty.</Message>
                     ) : (
                        <ListGroup variant="flush">
                           {cart.cartItems.map((item, index) => (
                              <ListGroup.Item key={index}>
                                 <Row>
                                    <Col md={2}>
                                       <Image fluid rounded src={item.image} />
                                    </Col>
                                    <Col>
                                       <Link to={`/product/${item.product}`}>
                                          {item.name}
                                       </Link>
                                    </Col>
                                    <Col md={4}>
                                       {item.qty} x &#8358;{item.price} =
                                       &#8358;{item.qty * item.price}
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                           ))}
                        </ListGroup>
                     )}
                  </ListGroup.Item>
               </ListGroup>
            </Col>
            <Col md={4}>
               <Card>
                  <ListGroup variant="flush">
                     <ListGroup.Item>
                        <h2>Order Summary</h2>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Items</Col>
                           <Col>&#8358;{cart.itemsPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Shipping</Col>
                           <Col>&#8358;{cart.shippingPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Tax</Col>
                           <Col>&#8358;{cart.taxPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Total</Col>
                           <Col>&#8358;{cart.totalPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        {error && <Message variant="danger">{error}</Message>}
                     </ListGroup.Item>

                     <ListGroup.Item>
                        <Button
                           style={{ width: "100%" }}
                           type="button"
                           className="btn-block"
                           disabled={cart.cartItems === 0}
                           onClick={placeOrderHandler}
                        >
                           Place Order
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default PlaceOrderScreen;
