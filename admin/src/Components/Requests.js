import React, { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";

import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";

import { URI } from "../utils/keys";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // API call. Fetch all students
    const main = async () => {
      const resposne = await fetch(`${URI}api/request`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await resposne.json();
      console.log(data.requests);
      setRequests(data.requests);
    };

    main();
  }, []);

  const requestHandler = async (request, requestApproval) => {
    const resposne = await fetch(`${URI}api/request`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        requestApproval,
        requestId: request._id,
        email: request.email,
      }),
    });

    const data = await resposne.json();

    const newRequests = [...requests];
    const index = newRequests.findIndex((r) => {
      return r._id === request._id;
    });
    newRequests[index] = data.request;
    setRequests(newRequests);
  };

  return (
    <div>
      {requests.length ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                {/* <th>Profile Pic</th> */}
                <th>Name</th>
                <th>Student Email</th>
                <th>Reason</th>
                <th>Leave</th>
                <th>Return</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => {
                return (
                  <tr key={request._id}>
                    <td>{index + 1}</td>
                    <td>{request.name}</td>
                    <td>{request.email}</td>
                    <td>{request.reason}</td>
                    <td>{request.leave}</td>
                    <td>{request.return}</td>
                    <td>
                      {request.approved === "pending" ? (
                        <>
                          <FcApprove
                            size={30}
                            color="red"
                            style={{ marginRight: "0.5rem", cursor: "pointer" }}
                            onClick={() => {
                              requestHandler(request, "approved");
                            }}
                          />
                          <FcDisapprove
                            size={30}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              requestHandler(request, "rejected");
                            }}
                          />
                        </>
                      ) : request.approved === "approved" ? (
                        <>
                          <Badge variant="success">
                            <p
                              style={{
                                fontSize: "1rem",
                                padding: 5,
                                margin: 0,
                              }}
                            >
                              {request.approved}
                            </p>
                          </Badge>
                        </>
                      ) : (
                        <>
                          <Badge variant="danger">
                            <p
                              style={{
                                fontSize: "1rem",
                                padding: 5,
                                margin: 0,
                              }}
                            >
                              {request.approved}
                            </p>
                          </Badge>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <h2>No requests have been made by any student!!</h2>
      )}
    </div>
  );
}
