// UsersBanTable.jsx
import React from "react";
import { useSelector } from "react-redux";

const UsersBanTable = () => {
  const usersData = useSelector((state) => state.users);

  // Filtra solo los usuarios bloqueados
  const blockedUsers = usersData.filter((user) => !user.active);

  return (
    <div>
      <h2>Banned Users</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {blockedUsers.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersBanTable;
