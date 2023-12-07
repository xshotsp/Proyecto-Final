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

const URL="https://quirkz.up.railway.app"
//const URL = "http://localhost:3001"



const ProductForm = () => {
  const dispatch = useDispatch();
  const allBrands = useSelector((state)=>state.allBrands);
  const darkMode = useSelector((state) => state.darkMode);
  
  
  const [errorSubmit, setErrorSubmit] = useState("");
  const [control,setControl] = useState("");
 

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

  const color_select = ["Negro", "Blanco", "Rojo", "Amarillo", "Azul", "Café", "Gris", "Verde", "Habano", "Caqui"]
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
    colour: "",
    additionalImage: [],
    brands: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    price: "",
    colour: "",
    brands: ""
  });

  

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
  //   console.log(event.target.name)
  //   const file = event.target.files[0]
  //   if(file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = function charge () {
        
  //       setProductData({
  //         ...productData,
  //         [event.target.name] : [...productData[event.target.name], reader.result]
  //       }) 
  //       validate({
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

   
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let long = Object.values(errors);
      
      if (long.every(esVacio)) {
          dispatch(createProductRequest());
          const response = await axios.post(`${URL}/product`, productData);
          const newProduct = response.data;
          if (newProduct) mostrarAlerta('success' , 'El producto se creó de manera exitosa' );
  
          dispatch(createProductSuccess(newProduct));
      
          setProductData({ name: "", image: "", price: "", colour: "", additionalImage: [], brands: ""});
          setControl("");

        }else {
          setErrorSubmit('Debe llenar todos los campos sin errores')
        }
    } catch (error) {
      console.log(error)
      mostrarAlerta('error', error.response.data);
      dispatch(createProductFailure(error.message));
    }
    
  };


  return (
    <div>
      <h2 className={s.h2}>Crear Producto</h2>
      <form className={`${s.form} ${s["product-form"]}  ${darkMode && s.darkMode}`} onSubmit={handleSubmit}>
        <label>
          Nombre:
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
          htmlFor = "image"> Subir Imagen
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
        <label className={s.precio}>
          Precio:
          <input
            type="text"
            name="price"
            id="price"
            value={productData.price}
            onChange={handleChange}
          />
          <span>{errors.price}</span>
        </label>
        
        <label className="label-form" htmlFor="colour">Color</label>
            <select  name="colour" onChange={handleChange} value={productData.colour} >
            <option  hidden>seleccionar color</option>
              {color_select?.map((option, index) => (
              <option key={index} value={option}>{option}</option>))}
            </select>
          <span>{errors.colour}</span>
        
        
       
        <img src={productData.additionalImage[0]} alt="" />
        
        <span>{control}</span>
         <label>Marcas: </label>
        <select onChange={handleChange} name="brands" id="brands" value={productData.brands}>
          <option hidden>seleccionar marca</option>{
            allBrands?.map((b)=><option key={b} value={b.id}>{b.name}</option>)
          }
        </select>
        <span>{errors.brands}</span>
        
        <button type="submit" id="submit" disabled={buttonDisabled() || productData.price.length === 0}>
          Crear Producto
        </button>
        {errorSubmit && <span>{errorSubmit}</span>}
      </form>
      
    </div>
  );
};

export default ProductForm;
