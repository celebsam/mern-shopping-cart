import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";

const HomeScreen = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      axios
         .get("/api/products")
         .then(({ data }) => {
            setProducts(data);
         })
         .catch((err) => console.log(err));
   }, []);
   return (
      <>
         <h1>Latest products</h1>
         <Row>
            {products.map((product) => (
               <Col key={product._id} sm={12} md={6} lg={4}>
                  <Product product={product} />
               </Col>
            ))}
         </Row>
      </>
   );
};

export default HomeScreen;
