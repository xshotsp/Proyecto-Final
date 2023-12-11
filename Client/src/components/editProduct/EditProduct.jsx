import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  getBrands,
} from "../../redux/actions/actions";
import validate from "./validate";
import axios from "axios";
import s from "./EditProduct.module.css"
import Swal from 'sweetalert2';

//const URL="https://quirkz.up.railway.app"
 const URL = "http://localhost:3001"



const EditProduct = () => {

  const {id} = useParams();

  const dispatch = useDispatch();
  //const allBrands = useSelector((state)=>state.allBrands);
  const darkMode = useSelector((state) => state.darkMode);
  
  
  const [errorSubmit, setErrorSubmit] = useState("");
  //const [control,setControl] = useState("");
 
  
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
    colour: "",
    quantity: 0,
    additionalImage: [],
    brands: [],
    active: true
  });

  useEffect(()=>{
    async function getByID() {
        const { data } = await axios.get(`${URL}/product/${id}`)
        setProductData(data)
    }
    getByID()
    dispatch(getBrands())
  }, [id, dispatch])

  const color_select = ["Beige","Black", "Blue", "Brown", "Gray", "Green", "Kaqui", "Red", "White", "Yellow", productData.colour]

  const mostrarAlerta = (iconType, msjText) => {
    Swal.fire({
      icon: iconType,
      title: '',
      text: msjText,
    });
  };

  const [errors, setErrors] = useState({});



  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name] : e.target.value
    })
    setErrorSubmit("")
    setErrors(
      validate({
        ...productData,
        [e.target.name]: e.target.value},
        e.target.name)
    )
  };
 
  const handleChangeImage = (event) => {
    
    const file = event.target.files[0]
    if(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function charge () {
        console.log(reader.result)
        setProductData({
          ...productData,
          [event.target.name]:reader.result,
        }) 
        setErrors(
        validate({
          ...productData,
          [event.target.name]: reader.result},
          event.target.name)
        )
      }     
           
    } else {
      setProductData({...productData, [event.target.name]: ""})
      
    } 

    return
  }

  

    const esVacio= (elemento) => {
    return elemento === "";
  } 
 
    // const buttonDisabled= ()=>{
    //   let disabledAux = true;
    //   let long = Object.values(errors)
    //   if (long.every(esVacio)) disabledAux = false;
    //   else{
    //       disabledAux = true;
    //     }
    
    //   return disabledAux
    // }
  
    const removeImage = (e) =>{
      setProductData({
        ...productData,
        [e.target.name] : "",
      })
      setErrors(
      validate({
        ...productData,
        [e.target.name]: ""},
        e.target.name)
      )
    }

    
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(errors)
      let long = Object.values(errors);
      
      if (long.every(esVacio)) {
          dispatch(createProductRequest());
          
          const response = await axios.put(`${URL}/product/put/${id}`, productData);
          const newProduct = response.data;
          if (newProduct) mostrarAlerta('success' , 'El producto se actualizó de manera exitosa' );
  
          dispatch(createProductSuccess(newProduct));
      
          

        }else {
          mostrarAlerta('error','Debe llenar todos los campos sin errores')
        }
    } catch (error) {
      console.log(error)
      mostrarAlerta('error', error.response.data);
      dispatch(createProductFailure(error.message));
    }
    
  };


  return (
    <div>
      <h2 className={s.h2}>Edit Product</h2>
      <form className={`${s.form} ${s["product-form"]}  ${darkMode && s.darkMode}`} onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        <span>{errors.name}</span>
        </label>
        
        <label
        className={s.buttonfile}
          htmlFor = "image"> Load Image
          <input
          className={s.inputfile}
            type="file"
            name="image"
            id="image"
            onChange={handleChangeImage}
          />
          </label>
        <span>{errors.image}</span>
        
        
        <img src={productData.image} alt="" className={s.img}/>
       <div className={s.div__remove__btn}>
        {
          productData.image && <button type="button" id="button" name="image" onClick={removeImage} className={s.remove__btn}>X</button>
        }
        
        </div>
        <div className={s.pricequantity}>
        <label className={s.precio}>
          Price:
          <input
            type="text"
            name="price"
            id="price"
            value={productData.price}
            onChange={handleChange}
          />
          <span>{errors.price}</span>
        </label>
        <label className={s.precio}>
          Quantity:
          <input
            type="number"
            min="1"
            name="quantity"
            id="quantity"
            value={productData.quantity}
            onChange={handleChange}
          />
          <span>{errors.quantity}</span>
        </label>
        </div>
        <label className="label-form" htmlFor="colour">Color</label>
            <select  name="colour" onChange={handleChange} value={productData.colour} >
            <option  hidden>select color</option>
              {color_select?.map((option, index) => (
              <option key={index} value={option}>{option}</option>))}
            </select>
          <span>{errors.colour}</span>
        
        
        <button type="submit" id="submit" >
          Edit Product
        </button>
        {errorSubmit && <span>{errorSubmit}</span>}
      </form>
      
    </div>
  );
};

export default EditProduct;