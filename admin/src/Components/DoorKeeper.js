import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";

import AddDoorKeeper from "./AddDoorKeeper";
import { URI } from "../utils/keys";

export default function DoorKeeper() {
  const [doorKeepers, setDoorKeepers] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  const deleteDoorKeeperHandler = async (doorKeeper) => {
    const resposne = await fetch(`${URI}api/doorKeeper/delete"`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email: doorKeeper.email }),
    });

    const data = await resposne.json();

    if (data.doorKeeper) {
      const data = [...doorKeeper];
      const newData = data.filter((d) => {
        return d._id !== doorKeeper._id;
      });
      setDoorKeepers(newData);
    }
  };

  useEffect(() => {
    const main = async () => {
      const resposne = await fetch(`${URI}api/doorKeeper"`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await resposne.json();
      setDoorKeepers(data.doorKeepers);
    };

    main();
  }, []);

  return (
    <div>
      {isAdd ? (
        <AddDoorKeeper
          onClose={() => {
            setIsAdd(false);
          }}
          setNewDoorKeeper={(doorKeeper) => {
            const data = [...doorKeepers];
            data.push(doorKeeper);
            setDoorKeepers(data);
          }}
        />
      ) : (
        []
      )}
      {doorKeepers.length ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                {/* <th>Profile Pic</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doorKeepers.map((d, index) => {
                return (
                  <>
                    <tr>
                      <td>1</td>
                      {/* <td>
                      <img
                        style={{ width: 50, height: 50 }}
                        src={"../../uploads/1619011212491bc1.jpg"}
                        alt="profile pic"
                      />
                    </td> */}
                      <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>
                        <AiFillDelete
                          size={20}
                          color="red"
                          style={{
                            marginRight: "0.5rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            deleteDoorKeeperHandler(d);
                          }}
                        />
                        <MdModeEdit
                          size={20}
                          style={{ cursor: "pointer" }}
                          onClick={() => {}}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <h2>No Door keepers are added!!</h2>
      )}
      <div style={{ marginLeft: "1rem", marginTop: "2rem" }}>
        <Button
          onClick={() => {
            setIsAdd(true);
          }}
          variant="primary"
        >
          Add new door keeper
        </Button>
      </div>
    </div>
  );
}
