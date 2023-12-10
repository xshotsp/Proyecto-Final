import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LabelAndInput from "../labelAndInput/LabelAndInput";
import axios from "axios";
import validate from './validate';
import s from "./edit.module.css"
import Swal from 'sweetalert2';
import placeHolderPhoto from "../../assets/placeholder foto.jpg"

//const URL = "http://localhost:3001";

const URL = 'https://quirkz.up.railway.app';

const EditPerfilForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useParams();

  console.log(email)

  const [photoUser, setPhotoUser] = useState(placeHolderPhoto);
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    profile_picture: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    // name: "",
    // lastname: "",
    // phone: "",
  })

useEffect (() => {
  async  function getByID()  {
    const { data } = await axios.get(`${URL}/user/${email}`)
    setInput({name: data.name, lastname: data.lastname, email: data.email, 
      phone: data.phone, profile_picture: data.profile_picture})
  }
  getByID()

  }, [email, dispatch])

  const mostrarAlerta = (iconType, msjText) => {
    Swal.fire({
      icon: iconType,
      title: '',
      text: msjText,
    });
  };

  console.log(input)

  const formHandler = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value
      })
    )
    
  };

  const volver = () => {
    navigate('/');
  }

  const handleChangeImage = (event) => {  
    const file = event.target.files[0]
    if(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function charge () {
        console.log(reader.result)
        setInput({
          ...input,
          [event.target.name]:reader.result,
        })
        setPhotoUser(reader.result) 
      }     
           
    } else {
      setInput({...input, [event.target.name]: ""})
      setPhotoUser(placeHolderPhoto)
    } 
    return
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log(errors)
      const long = Object.values(errors);
          if (long.length === 0) {
              await axios.put(`${URL}/user/${email}`, input);
              mostrarAlerta('success' , 'User was successfully updated' );
              navigate('/');
             
          } else mostrarAlerta('error', 'You must complete all fields without errors')

    } catch (error) {
      console.log(error)
      mostrarAlerta('error' ,error.response.data);
      
    }
  };

  return (
    <div>
      <form className={`${s.form} ${s["s-formedit"]}`} onSubmit={submitHandler}>
      <label onClick={volver} className ={s.close}>X</label>
        <fieldset>
        
        <legend>Edit Profile</legend>
        <h3>{input.email}</h3>

        <img src={input.profile_picture? input.profile_picture: photoUser} alt="" />
        
        <label
          className={s.buttonfile}
          htmlFor = "profile_picture"> Load Image
          <input
          className={s.inputfile}
            type="file"
            name="profile_picture"
            id="profile_picture"
            onChange={handleChangeImage}
          />
          </label>         
          <LabelAndInput
            label="Name"
            type="text"
            name="name"
            value={input.name}
            handler={formHandler}
          />
          {errors.name && <p>{errors.name}</p>}
          <LabelAndInput
            label="Lastname"
            type="text"
            name="lastname"
            value={input.lastname}
            handler={formHandler}
          />
          {errors.lastname && <p>{errors.lastname}</p>}
          <LabelAndInput
            label="Phone"
            type="text"
            name="phone"
            value={input.phone}
            handler={formHandler}
          />
          {errors.phone && <p>{errors.phone}</p>}
         
          
          <button type="submit">Edit</button>
        </fieldset>
      </form>
      {/*<Notification notification={notification} />*/ }
    </div>
  );
};

export default EditPerfilForm;
