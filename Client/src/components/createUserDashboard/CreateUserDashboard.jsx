import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import validate from "./validate";
import { useNavigate } from "react-router-dom";
import LabelAndInput from "../labelAndInput/LabelAndInput";
import UsersTable from "../usersTable/usersTable";
import s from "./createuser.module.css";

const URL = import.meta.env.VITE_URL


const CreateUserDashboard = () => {

  const navigate = useNavigate()
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    password: "",
    passwordRep: "",
    email: "",
    profile_picture:
      "https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg",
    phone: "",
    provider: "",
    active: true,
    admin: true
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    password: "",
    passwordRep: "",
    email: "",
    phone: ""
  });

  const mostrarAlerta = (iconType, msjText) => {
    Swal.fire({
      icon: iconType,
      title: "",
      text: msjText,
    });
  };

  const formHandler = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const comeback = () => {
    navigate('/dashboard', UsersTable);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const long = Object.values(errors);
      if (long.length === 0 && input.passwordRep) {
        await axios.post(`${URL}/user`, input);
        mostrarAlerta("success", "The user was created successfully");
        setInput({
            name: "",
            lastname: "",
            phone:"",
            password: "",
            passwordRep: "",
            email: "",

        });
      } else if (long.length !==0 || !input.passwordRep) mostrarAlerta("error", "You must complete all fields without errors");
    } catch (error) {
      console.log(error);
      mostrarAlerta("error", error.response.data);
    }
  };

  return (
    <div className={s.form__container}>
      <form className={`${s.form} ${s["s-form"]}`} onSubmit={submitHandler}>
      <label onClick={comeback} className ={s.close}>X</label>
        <fieldset>
          <legend>Create User</legend>

          <LabelAndInput
            label="Name*"
            type="text"
            name="name"
            value={input.name}
            handler={formHandler}
          />
          {errors.name && <p>{errors.name}</p>}
          <LabelAndInput
            label="Lastname*"
            type="text"
            name="lastname"
            value={input.lastname}
            handler={formHandler}
          />
          {errors.lastname && <p>{errors.lastname}</p>}
          <LabelAndInput
            label="Phone*"
            type="text"
            name="phone"
            value={input.phone}
            handler={formHandler}
          />
          {errors.email && <p>{errors.email}</p>}
          <LabelAndInput
            label="Email*"
            type="text"
            name="email"
            value={input.email}
            handler={formHandler}
          />
          {errors.email && <p>{errors.email}</p>}

          <LabelAndInput
            label="Password*"
            type="password"
            name="password"
            value={input.password}
            handler={formHandler}
          />
          {errors.password && <p>{errors.password}</p>}
          <LabelAndInput
            label="Confirmation*"
            type="password"
            name="passwordRep"
            value={input.passwordRep}
            handler={formHandler}
          />
          {errors.passwordRep && <p>{errors.passwordRep}</p>}
          <span>*Mandatory</span>
          <br></br>
          <button type="submit">Create</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateUserDashboard;