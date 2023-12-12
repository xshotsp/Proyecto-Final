/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  getProducts,
  getBrands,
} from "../../redux/actions/actions";
import validate from "./validate"
import axios from "axios";
import s from "./productForm.module.css"
import Swal from 'sweetalert2';

//const URL="https://quirkz.up.railway.app"
const URL = "http://localhost:3001"



const ProductForm = () => {
  const dispatch = useDispatch();
  const allBrands = useSelector((state)=>state.allBrands);
  const darkMode = useSelector((state) => state.darkMode);
  
  
  const [errorSubmit, setErrorSubmit] = useState("");
  //const [control,setControl] = useState("");
 

  useEffect(()=>{
    dispatch(getProducts())
    dispatch(getBrands())
  }, [])

  const mostrarAlerta = (iconType, msjText) => {
    Swal.fire({
      icon: iconType,
      title: '',
      text: msjText,
    });
  };

  const color_select = ["Beige","Black", "Blue", "Brown", "Gray", "Green", "Kaqui", "Red", "White", "Yellow"]
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
    colour: "",
    quantity: 0,
    additionalImage: [],
    brands: "",
    active: true
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    price: "",
    colour: "",
    quantity: "",
    brands: ""
  });

  // const validateAd = (productData) => {
  //   if (productData.additionalImage.length === 3){
  //     setControl("Maximo tres imagenes" );
  //   } 
  // }

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

  // const handleChangeAdditional = (event) => {
  //   const file = event.target.files[0]
  //   if(file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = function charge () {
        
  //       setProductData({
  //         ...productData,
  //         [event.target.name] : [...productData[event.target.name], reader.result]
  //       }) 
  //       validateAd({
  //          ...productData,
  //       [event.target.name] : [...productData[event.target.name], reader.result]}, event.target.name)
  //     }     
         
  //   } else {
  //     setProductData({...productData, [event.target.name]: ""})
      
  //   } 
  //   return 
  // }

    const esVacio= (elemento) => {
    return elemento === "";
  } 
 
    const buttonDisabled= ()=>{
      let disabledAux = true;
      let long = Object.values(errors)
      if (long.every(esVacio)) disabledAux = false;
      else{
          disabledAux = true;
        }
    
      return disabledAux
    }
  
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

    // const removeImageAd = (e) =>{
    //   setControl("")
    //   setErrorSubmit("")
    //   if (e.target.name === "additionalImage0"){
    //     setProductData({
    //       ...productData, 
    //       additionalImage : [...productData.additionalImage.filter(X=>X !== productData.additionalImage[0])]
    //     })
    //   }
    //   if (e.target.name === "additionalImage1"){
    //     setProductData({
    //       ...productData,
    //       additionalImage : [...productData.additionalImage.filter(X=>X !== productData.additionalImage[1])]
    //      })
    //     }
    //   else if (e.target.name === "additionalImage2"){
    //     setProductData({
    //       ...productData,
    //       additionalImage : [...productData.additionalImage.filter(X=>X !== productData.additionalImage[2])]
    //      })
    //     }
    // }
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let long = Object.values(errors);
      
      if (long.every(esVacio)) {
          dispatch(createProductRequest());
          productData.active=true
          const response = await axios.post(`${URL}/product`, productData);
          const newProduct = response.data;
<<<<<<< HEAD
          if (newProduct) mostrarAlerta('success' , 'The product was created successfully' );
=======
          console.log(response)
          if (newProduct) mostrarAlerta('success' , 'El producto se creó de manera exitosa' );
>>>>>>> 9a10530f18e4388d4c538f456db76dc2cc0824ed
  
          dispatch(createProductSuccess(newProduct));
      
          setProductData({ name: "", image: "", price: "", quantity: "", colour: "", additionalImage: [], brands: ""});
          //setControl("");

        }else {
          mostrarAlerta('error', 'You must complete all fields without errors')
        }
    } catch (error) {
      console.log(error)
      mostrarAlerta('error', error.response.data);
      dispatch(createProductFailure(error.message));
    }
    
  };


  return (
    <div>
      <h2 className={s.h2}>Create Product</h2>
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
        <label className="label-form" htmlFor="colour">Colour</label>
            <select  name="colour" onChange={handleChange} value={productData.colour} >
<<<<<<< HEAD
            <option  hidden>select colour</option>
              {color_select?.map((option, index) => (
              <option key={index} value={option}>{option}</option>))}
=======
            <option  hidden>select color</option>
              {color_select?.map((option) => (
              <option key={option} value={option}>{option}</option>))}
>>>>>>> 9a10530f18e4388d4c538f456db76dc2cc0824ed
            </select>
          <span>{errors.colour}</span>
                

         <label>Brands: </label>
        <select onChange={handleChange} name="brands" id="brands" value={productData.brands}>
          <option hidden>select brand</option>{
            allBrands?.map((b)=><option key={b} value={b.id}>{b.name}</option>)
          }
        </select>
        <span>{errors.brands}</span>
        
        <button type="submit" id="submit" disabled={buttonDisabled() || !productData.price || !productData.name || !productData.quantity}>
          Create Product
        </button>
        {errorSubmit && <span>{errorSubmit}</span>}
      </form>
      
    </div>
  );
};

export default ProductForm;
