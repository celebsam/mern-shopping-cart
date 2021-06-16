import React, { useState, useEffect } from "react";
import {
   Button,
   Card,
   Col,
   Form,
   Image,
   ListGroup,
   Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match, history }) => {
   const [qty, setQty] = useState(1);
   const dispatch = useDispatch();

   const productDetails = useSelector((state) => state.productDetails);

   const { loading, error, product } = productDetails;

   useEffect(() => {
      dispatch(listProductDetails(match.params.id));
   }, [dispatch, match]);

   const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${qty}`);
   };
   return (
      <>
         <Link to="/" className="btn btn-secondary">
            <i className="fas fa-angle-double-left"></i>
         </Link>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error}</Message>
         ) : (
            <Row className="mt-4">
               <Col md={5}>
                  <Image src={product?.image} alt={product.name} fluid />
               </Col>
               <Col md={4}>
                  <ListGroup variant="flush">
                     <ListGroup.Item>
                        <h5>{product.name}</h5>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Rating
                           value={product.rating}
                           text={`${product.numReviews}  reviews`}
                        />
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <h5>&#8358;{product.price}</h5>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <p>{product.description}</p>
                     </ListGroup.Item>
                  </ListGroup>
               </Col>
               <Col md={3}>
                  <Card>
                     <ListGroup variant="flush">
                        <ListGroup.Item>
                           <Row>
                              <Col>Price:</Col>
                              <Col>&#8358;{product.price}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Status:</Col>
                              <Col>
                                 {product.countInStock > 0
                                    ? "In stock"
                                    : "Out of stock"}
                              </Col>
                           </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                           <ListGroup.Item>
                              <Row>
                                 <Col>Qty</Col>
                                 <Col>
                                    <Form.Control
                                       as="select"
                                       value={qty}
                                       onChange={(e) => {
                                          setQty(e.target.value);
                                       }}
                                    >
                                       {[
                                          ...Array(product.countInStock).keys(),
                                       ].map((x) => (
                                          <option key={x + 1} value={x + 1}>
                                             {x + 1}
                                          </option>
                                       ))}
                                    </Form.Control>
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                           <Button
                              onClick={addToCartHandler}
                              style={{ width: "100%" }}
                              className="btn-md btn-block btn-secondary"
                              type="button"
                              disabled={product.countInStock > 0 ? false : true}
                           >
                              Add To Cart
                           </Button>
                        </ListGroup.Item>
                     </ListGroup>
                  </Card>
               </Col>
            </Row>
         )}
      </>
   );
};

export default ProductScreen;
