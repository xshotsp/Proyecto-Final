// UsersTable.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GET_ALL_USERS } from "../../redux/actions/actionTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

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

  // Función para bloquear un usuario (puedes modificarla según tus necesidades)
  const handleBlockUser = (email) => {
    // Lógica para bloquear usuario
    console.log(`Usuario bloqueado: ${email}`);
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Bloquear</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.username}</td>
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
