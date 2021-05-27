import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = (props) => {
   const { id } = props.match.params;
   const [product, setProduct] = useState({});

   useEffect(() => {
      axios
         .get(`/api/products/${id}`)
         .then(({ data }) => {
            setProduct(data);
         })
         .catch((err) => console.log(err));
   });

   return (
      <>
         <Link to="/" className="btn btn-secondary">
            <i className="fas fa-angle-double-left"></i>
         </Link>
         <Row className="mt-4">
            <Col md={5}>
               <Image src={product.image} alt={product.name} fluid />
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
                     <ListGroup.Item>
                        <Button
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
      </>
   );
};

export default ProductScreen;
