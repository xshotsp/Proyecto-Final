// UsersTable.jsx
import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { getAllUsersAction } from "../../redux/actions/actions";
import s from "./usersTable.module.css"
// import { blockUserAction } from "../../redux/actions/actions"; // Importa la nueva acción

const URL = import.meta.env.VITE_URL;

const UsersTable = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.allUsers);
  console.log(usersData)

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  const handleBlockUser = async (email) => {
    await axios.put(`${URL}/user/restore/${email}`);
    dispatch(getAllUsersAction());
  };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Phone</th>
            <th>Banned</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.email} className={!user.active && s.disabled}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.phone}</td>
              <td>
                <FontAwesomeIcon
                  icon={faBan}
                  onClick={() => handleBlockUser(user.email)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
