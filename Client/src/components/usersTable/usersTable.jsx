// UsersTable.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GET_ALL_USERS } from "../../redux/actions/actionTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
// import { blockUserAction } from "../../redux/actions/actions"; // Importa la nueva acción

const UsersTable = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://quirkz.up.railway.app/user/all");
        dispatch({ type: GET_ALL_USERS, payload: response.data });
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  
  const handleBlockUser = async (email) => {
    
   const input = {active: false}
  await axios.put(`${URL}/user/all/${email}`, input);
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Phone</th>
            <th>Bloquear</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.email}>
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
