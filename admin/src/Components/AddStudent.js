import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import "./AddStudent.css";

export default function AddStudent(props) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePic: undefined,
  });

  const addStudentHandler = async () => {
    console.log(student);

    const formData = new FormData();
    //formData.append("profilePic", student.profilePic);
    formData.append("email", student.email);
    formData.append("name", student.name);
    formData.append("mobile", student.mobile);

    const { data } = await axios.post(
      "http://localhost:3000/api/auth/signup",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(data);
    props.setNewStudent(data);
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
              if (student.email && student.name && student.mobile) {
                addStudentHandler();
                return;
              }
            }}
            variant="success"
            type="button"
          >
            Add
          </Button>
        </Form>
      </div>
    </>
  );
}
