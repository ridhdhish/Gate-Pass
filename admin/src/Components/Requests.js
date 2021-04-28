import React, { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";

import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  const base64String =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK0SURBVO3BSY7kQAwEQQ9C//+yTx95SkCQqhcOzeIX1hjFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUa5eCgJ30nlJAlPqHRJ+E4qTxRrlGKNUqxRLl6m8qYk3KFyRxLuUHlTEt5UrFGKNUqxRrn4sCTcoXJHEjqVLgmdypuScIfKJxVrlGKNUqxRLv5zKpMUa5RijVKsUS6GSUKncpKETuUvK9YoxRqlWKNcfJjKb5KETuUJld+kWKMUa5RijXLxsiT8JJUuCZ1Kl4RO5SQJv1mxRinWKMUa5eIhlb9M5UTlLynWKMUapVijXDyUhE6lS8KbVDqVLgmdSpeETuUkCW9S+aRijVKsUYo1ysVDKicqXRI6lSeS0KnckYQ7VE6ScEcSOpUnijVKsUYp1ijxCx+UhDepnCThRKVLQqfSJeFEpUvCHSpvKtYoxRqlWKNcfDOVkyR0Kl0STlS6JHRJOEnCicoTKp9UrFGKNUqxRolfeFES7lA5ScKbVLokdConSehUnkhCp/JEsUYp1ijFGuXiZSpvUjlJQqfyk5LQqZyovKlYoxRrlGKNEr/wQBK+k8pJEjqVLgmdSpeETuUkCZ1Kl4QTlTcVa5RijVKsUS5epvKmJJwkoVPpktCpnKicJOEkCT+pWKMUa5RijXLxYUm4Q+VNKl0SOpUuCZ1Kp9IloVM5ScInFWuUYo1SrFEuhklCp3KShJMknKh0SehUOpVPKtYoxRqlWKNc/GdUuiR0Kl0S7lDpktCpfFKxRinWKMUa5eLDVD5JpUvCSRJOknCi0iXhNynWKMUapVijXLwsCd8pCXeodEnoVJ5QOUlCp/KmYo1SrFGKNUr8whqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYo/wDUsBPle3QEgQAAAABJRU5ErkJggg==";

  useEffect(() => {
    // API call. Fetch all students
    const main = async () => {
      const resposne = await fetch("http://localhost:3000/api/request", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await resposne.json();
      setRequests(data.requests);
    };

    main();
  }, []);

  const requestHandler = async (request, requestApproval) => {
    const resposne = await fetch("http://localhost:3000/api/request", {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ requestApproval, requestId: request._id }),
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
      <img src={base64String} alt="QRCode" />
      {requests.length ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                {/* <th>Profile Pic</th> */}
                <th>Student Email</th>
                <th>Reason</th>
                <th>Leave Date</th>
                <th>Leave Time</th>
                <th>Return Date</th>
                <th>Return Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => {
                return (
                  <tr key={request._id}>
                    <td>{index + 1}</td>
                    <td>{request.email}</td>
                    <td>{request.reason}</td>
                    <td>{`${new Date(request.leave_date).getDate()}/${
                      new Date(request.leave_date).getMonth() + 1
                    }/${new Date(request.leave_date).getFullYear()}`}</td>
                    <td>{request.leave_time}</td>
                    <td>{`${new Date(request.return_date).getDate()}/${
                      new Date(request.return_date).getMonth() + 1
                    }/${new Date(request.return_date).getFullYear()}`}</td>
                    <td>{request.return_time}</td>
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
