import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  getProducts,
  getBrands,
} from "../../redux/actions/actions";
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

  const color_select = ["Black", "White", "Red", "Yellow", "Blue", "Brown", "Gray", "Green", "Beige", "Khaki"]
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
    colour: "",
    additionalImage: [],
    brands: "",
  });

  const [errors, setErrors] = useState({
    name: "Campo requerido",
    image: "Debe incluir una imagen del producto",
    price: "Campo requerido",
    colour: "Campo requerido",
    brands: "Campo requerido"
  });

  const validate = (productData, name) => {
  
    if (name === "name") {
        if (productData.name === "") setErrors({ ...errors, name: "El nombre es requerido" });
      else if (productData.name.length >= 50) setErrors({ ...errors, name: "El nombre debe ser menor a 50 caracteres" })
      else setErrors({...errors, name: ""})
    }

    if (name === "image") {
       if (productData.image) setErrors({ ...errors, image: "" })
       else setErrors({ ...errors, image: "Debe incluir una imagen del producto" })
     }

    if (name === "price") {
       if (isNaN(parseInt(productData.price))) setErrors({ ...errors, price: "El dato debe ser un numero" });
      else if (productData.price < 0) {errors.price = "El valor debe ser mayor a 0"} 
      else setErrors({ ...errors, price: "" });
    }

    if (name === "colour") {
      if (!productData.colour.length) setErrors({ ...errors, colour: "El color es requerido" });
      else setErrors({ ...errors, colour: "" });
    }



    if (name === "brands") {
      if (!productData.brands.length) setErrors({ ...errors, brands: "La marca es requerida" });
      else setErrors({ ...errors, brands: "" });
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name] : e.target.value
    })
    setErrorSubmit("")
  
    validate({
        ...productData,
        [e.target.name]: e.target.value},
        e.target.name);
    return;
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
        validate({
          ...productData,
          [event.target.name]: reader.result},
          event.target.name);
      }     
           
    } else {
      setProductData({...productData, [event.target.name]: ""})
    } 

    return
  }

  const handleChangeAdditional = (event) => {
    console.log(event.target.name)
    const file = event.target.files[0]
    if(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function charge () {
        
        setProductData({
          ...productData,
          [event.target.name] : [...productData[event.target.name], reader.result]
        }) 
        validate({
           ...productData,
        [event.target.name] : [...productData[event.target.name], reader.result]}, event.target.name)
      }     
         
    } else {
      setProductData({...productData, [event.target.name]: ""})
      
    } 
    
    return 
  }
 
 
    const buttonDisabled= ()=>{
      let disabledAux = true;
      for(let error in errors){
        if(errors[error]=== "") disabledAux = false;
        else{
          disabledAux = true;
          break;
        }
      }
      return disabledAux
    }
  
    const removeImage = (e) =>{
      setProductData({
        ...productData,
        [e.target.name] : "",
      })
      validate({
        ...productData,
        [e.target.name]: ""},
        e.target.name);
      
    }

   
  
    const esVacio= (elemento) => {
      return elemento === "";
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
          setErrors ({name: "Campo requerido", image: "Debe incluir una imagen del producto", price: "Campo requerido", colour: "Campo requerido",
          brands: "Campo requerido"});
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
        
        <button type="submit" id="submit" disabled={buttonDisabled()}>
          Crear Producto
        </button>
        {errorSubmit && <span>{errorSubmit}</span>}
      </form>
      
    </div>
  );
};

export default ProductForm;
