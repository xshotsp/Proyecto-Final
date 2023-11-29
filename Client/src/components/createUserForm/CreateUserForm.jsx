import { useState } from "react";
import LabelAndInput from "../labelAndInput/LabelAndInput";
import axios from "axios";
import Notification from "../notification/Notification";
import s from "./create.module.css"

const CreateUserForm = () => {
  const [notification, setNotification] = useState(null);
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
    profile_picture: "",
    member: "",
  });

  const formHandler = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const objetUser = {
      ...input,
      profile_picture: !input.profile_picture ? 'https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg': input.profile_picture
    }
    try {
      const response = await axios.post("http://localhost:3001/user", objetUser);
      setNotification({
        message: "Usuario creado con éxito",
        status: response.status,
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({
        message: error.response.data,
        status: 400,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };


  return (
    <div>
      <form className={`${s.form} ${s["s-form"]}`} onSubmit={submitHandler}>
        <fieldset>
        <legend>Crear Usuario</legend>
          <LabelAndInput
            label="Username*"
            type="text"
            name="username"
            value={input.username}
            handler={formHandler}
          />
          <LabelAndInput
            label="Email*"
            type="text"
            name="email"
            value={input.email}
            handler={formHandler}
          />
          <LabelAndInput
            label="Member"
            type="text"
            name="member"
            value={input.member}
            handler={formHandler}
          />
          <LabelAndInput
            label="Profile Picture"
            type="text"
            name="profile_picture"
            value={input.profile_picture}
            handler={formHandler}
          />
          <LabelAndInput
            label="Password*"
            type="password"
            name="password"
            value={input.password}
            handler={formHandler}
          />
          <p>*Obligatorios</p>
          <button type="submit">Crear</button>
        </fieldset>
      </form>
      <Notification notification={notification} />
    </div>
  );
};

export default CreateUserForm;
