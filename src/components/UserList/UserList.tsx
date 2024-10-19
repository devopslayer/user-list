import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./UserList.css";
import React, { useEffect, useState } from "react";

interface User {
  first_name: string;
  last_name: string;
  username: string;
  age: number;
  marital_status: string;
  is_employed: boolean;
  is_founder: boolean;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<User>({
    first_name: "",
    last_name: "",
    username: "",
    age: 0,
    marital_status: "",
    is_employed: false,
    is_founder: false,
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddOrUpdateUser = () => {
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = newUser;
      setUsers(updatedUsers);
      setEditIndex(null);
      alert("Updated user data");
    } else {
      setUsers([...users, { ...newUser }]);
      alert("Added user data");
    }

    setNewUser({
      first_name: "",
      last_name: "",
      username: "",
      age: 0,
      marital_status: "",
      is_employed: false,
      is_founder: false,
    });
  };

  const handleEditUser = (index: number) => {
    setEditIndex(index);
    setNewUser(users[index]);
  };

  const handleDeleteUser = (index: number) => {
    const confirmDelete = window.confirm(
      "Deleting the user. This action cannot be undone."
    );
    if (confirmDelete) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };

  const isButtonDisabled =
    !newUser.first_name ||
    !newUser.last_name ||
    !newUser.username ||
    !newUser.marital_status ||
    newUser.age <= 0;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-0">
      <header className="d-flex overflow-hidden">
        <h1>User</h1>
        <h4>
          <sub>List</sub>
        </h4>
      </header>

      <div className="content">
        <div className="mt-4">
          <div className="card" style={{ width: "16rem" }}>
            <div className="card-header">
              <h4>{editIndex !== null ? "Edit User" : "Create a New User"}</h4>
            </div>
            <form>
              <div className="card-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={newUser.first_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, first_name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Last Name"
                  value={newUser.last_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, last_name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Age"
                  value={newUser.age.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      value === "" ||
                      (parseInt(value) > 0 &&
                        parseInt(value) <= 120 &&
                        !value.includes("e") &&
                        /^[0-9]+$/.test(value))
                    ) {
                      setNewUser({ ...newUser, age: value ? +value : 0 });
                    }
                  }}
                  required
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Marital Status"
                  value={newUser.marital_status}
                  onChange={(e) =>
                    setNewUser({ ...newUser, marital_status: e.target.value })
                  }
                  required
                />
                <div className="d-flex justify-content-start align-self-start">
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={newUser.is_employed}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          is_employed: e.target.checked,
                        })
                      }
                    />
                    <label className="form-check-label">Employed</label>
                  </div>
                  <div className="form-check mt-2 mx-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={newUser.is_founder}
                      onChange={(e) =>
                        setNewUser({ ...newUser, is_founder: e.target.checked })
                      }
                    />
                    <label className="form-check-label">Founder</label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-2"
                  title={editIndex !== null ? "Update user" : "Add user"}
                  onClick={handleAddOrUpdateUser}
                  disabled={isButtonDisabled}
                >
                  {editIndex !== null ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-4">
          <div
            className="card list-card overflow-hidden"
            style={{ height: "24.5rem" }}
          >
            <div className="card-header">
              <h4>Members Overview</h4>
            </div>
            <div className="card-body scroll overflow-auto">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Age</th>
                    <th>Marital Status</th>
                    <th>Employed</th>
                    <th>Founder</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.username}</td>
                      <td>{user.age}</td>
                      <td>{user.marital_status}</td>
                      <td>{user.is_employed ? "Yes" : "No"}</td>
                      <td>{user.is_founder ? "Yes" : "No"}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          title="Edit results"
                          onClick={() => handleEditUser(index)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          title="Delete results"
                          onClick={() => handleDeleteUser(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
