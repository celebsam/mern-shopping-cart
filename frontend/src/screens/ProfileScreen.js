import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";
import { Link } from "react-router-dom";

const ProfileScreen = ({ location, history }) => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [message, setMessage] = useState(null);

   const dispatch = useDispatch();
   const userDetails = useSelector((state) => state.userDetails);
   const { loading, error, user } = userDetails;
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   useEffect(() => {
      if (!userInfo) {
         history.push("/login");
      } else {
         if (!user.name) {
            dispatch(getUserDetails("profile"));
         } else {
            setName(user.name);
            setEmail(user.email);
         }
      }
   }, [dispatch, history, userInfo, user]);
   const submitHandler = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         setMessage("Passwords do not match");
      } else {
         //  update profile
      }
   };
   return (
      <Row className="py-3">
         <Col md={3}>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
               <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group className="mt-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                     type="email"
                     placeholder="Enter Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group className="mt-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Enter Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Form.Group className="mt-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Re-enter Password"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
               </Form.Group>
               <Button className="mt-4" type="submit" variant="primary">
                  Update
               </Button>
            </Form>
         </Col>
         <Col md={9}>
            <h2>My Orders</h2>
         </Col>
      </Row>
   );
};

export default ProfileScreen;
