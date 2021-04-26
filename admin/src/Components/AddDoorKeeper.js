import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function AddDoorKeeper(props) {
  const [doorKeeper, setDoorKeeper] = useState({
    name: "",
    email: "",
  });

  const addDoorKeeperHandler = async () => {
    const resposne = await fetch("http://localhost:3000/api/doorKeeper/add", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ ...doorKeeper }),
    });

    const data = await resposne.json();
    //setDoorKeeper(data.doorKeeper);

    props.setNewDoorKeeper(data.doorKeeper);
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
                setDoorKeeper({ ...doorKeeper, email: e.target.value });
              }}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => {
                setDoorKeeper({ ...doorKeeper, name: e.target.value });
              }}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>

          <Button
            onClick={() => {
              if (doorKeeper.email && doorKeeper.name) {
                addDoorKeeperHandler();
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
