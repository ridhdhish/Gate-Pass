import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import AddStudent from "./AddStudent";

import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import UpdateUser from "./UpdateUser";

import { URI } from "../utils/keys";

export default function StudentDashboard() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState();

  useEffect(() => {
    // API call. Fetch all students
    const main = async () => {
      const resposne = await fetch(`${URI}api/user`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await resposne.json();
      setStudents(data.users);
    };

    main();
  }, []);

  const updateStudentHandler = async (student) => {
    setStudent(student);
    setIsEdit(true);
  };

  const deleteStudentHandler = async (student) => {
    const response = await fetch(`${URI}api/user`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: student._id }),
    });

    const data = await response.json();

    if (data.user) {
      const oldStudents = [...students];
      const newStudents = oldStudents.filter((s, index) => {
        return s._id !== student._id;
      });
      console.log(newStudents);
      setStudents(newStudents);
    }
  };

  return (
    <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
      {isAdd && (
        <AddStudent
          setNewStudent={(student) => {
            const newStudents = [...students];
            newStudents.push(student.user);
            setStudents(newStudents);
          }}
          onClose={() => {
            setIsAdd(false);
          }}
        />
      )}

      {isEdit && (
        <UpdateUser
          student={student}
          update={(student) => {
            console.log(student);
            const oldStudents = [...students];
            const index = oldStudents.findIndex((s) => {
              return s._id === student._id;
            });
            oldStudents[index] = student;
            setStudents(oldStudents);
          }}
          onClose={() => {
            setIsEdit(false);
          }}
        />
      )}

      {students.length ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Profile Pic</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                //console.log(student.profilePic);
                return (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        style={{ width: 50, height: 50 }}
                        src={`data:image/jpeg;base64, ${student.profilePic}`}
                        alt="profile pic"
                      />
                    </td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.mobile}</td>
                    <td>
                      <AiFillDelete
                        size={20}
                        color="red"
                        style={{ marginRight: "0.5rem", cursor: "pointer" }}
                        onClick={() => {
                          deleteStudentHandler(student);
                        }}
                      />
                      <MdModeEdit
                        size={20}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          updateStudentHandler(student);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <h2>No students are added yet</h2>
      )}

      <div style={{ marginLeft: "1rem", marginTop: "2rem" }}>
        <Button
          onClick={() => {
            setIsAdd(true);
          }}
          variant="primary"
        >
          Add new Student
        </Button>
      </div>
    </div>
  );
}
