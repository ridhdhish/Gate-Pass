import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function UpdateUser(props) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  console.log(props.student);

  const updateStudentHandler = async () => {
    console.log(props.student);

    const response = await fetch("http://localhost:3000/api/user", {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: student.name,
        email: student.email,
        mobile: student.mobile,
        userId: props.student._id,
      }),
    });

    const data = await response.json();

    props.update(data.user);
    props.onClose();
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "black",
          opacity: 0.5,
          overflow: "hidden",
        }}
        onClick={() => {
          props.onClose();
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "2rem",
          borderRadius: 10,
          width: "30rem",
          overflow: "hidden",
        }}
      >
        <h2>Update User</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => {
                setStudent({ ...student, email: e.target.value });
              }}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => {
                setStudent({ ...student, name: e.target.value });
              }}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              onChange={(e) => {
                setStudent({ ...student, mobile: e.target.value });
              }}
              type="mobile"
              placeholder="Mobile number"
            />
          </Form.Group>

          {/* <Form.Group controlId="formBasicPassword">
            <Form.Label>Student image</Form.Label>
            <Form.Control
              onChange={(e) => {
                console.log(e.target);
                setStudent({ ...student, profilePic: e.target.files[0] });
              }}
              type="file"
              placeholder="Mobile number"
            />
          </Form.Group> */}
          <Button
            onClick={() => {
              updateStudentHandler();
            }}
            variant="success"
            type="button"
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}
