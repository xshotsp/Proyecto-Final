// UsersBanTable.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../redux/actions/actions";

const UsersBanTable = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch()

  // Filtra solo los usuarios bloqueados
  const blockedUsers = allUsers.filter((user) => user.active === false);

  console.log(blockedUsers)

  useEffect(() => {
    dispatch(getAllUsersAction())
  }, [])
  

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
