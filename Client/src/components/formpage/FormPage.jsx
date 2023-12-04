import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  getProducts,
  getBrands,
} from "../../redux/actions/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
faMoneyBill1,
faImage,
faImages,
} from '@fortawesome/free-solid-svg-icons';
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
    additionalImage: "",
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

    if (name === "additionalImage") {
      console.log(productData.additionalImage.length)
      if (productData.additionalImage.length === 3){
        setControl("Maximo tres imagenes" );
      } 
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

    const removeImageAd = (e) =>{
      setControl("")
      setErrorSubmit("")
      if (e.target.name === "additionalImage0"){
        setProductData({
          ...productData, 
          additionalImage : [...productData.additionalImage.filter(X=>X !== productData.additionalImage[0])]
        })
      }
      if (e.target.name === "additionalImage1"){
        setProductData({
          ...productData,
          additionalImage : [...productData.additionalImage.filter(X=>X !== productData.additionalImage[1])]
         })
        }
      else if (e.target.name === "additionalImage2"){
        setProductData({
          ...productData,
          additionalImage : [...productData.additionalImage.filter(X=>X !== productData.additionalImage[2])]
         })
        }
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
          setErrors ({name: "Campo requerido", image: "Debe incluir una imagen del producto", price: "Campo requerido", colour: "Campo requerido", additionalImage: "",
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
    <div className={`${s.container_from} ${darkMode ? s.darkMode : s.lightMode}`}>
      <h2>Crear Producto</h2>
      <form className={`${s.form} ${s["product-form"]}`} onSubmit={handleSubmit}>
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
        
        <br />
        <label
        className={s.buttonfile}
          htmlFor = "image"> 
            <i>
          <FontAwesomeIcon icon={faImage} />
          </i>
          Imagen:
          <input
          className={s.inputfile}
            type="file"
            name="image"
            id="image"
            onChange={handleChangeImage}
          />
          </label>
        <span>{errors.image}</span>
        
        <br />
        
        <img src={productData.image} alt="" />
       <br />
       <div>
        {
          productData.image && <button type="button" id="button" name="image" onClick={removeImage}>X</button>
        }
        
        </div>
        <label className={s.precio}>
          <i><FontAwesomeIcon icon={faMoneyBill1} /></i>
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
        
        <br />
        <label className="label-form" htmlFor="colour">Color</label>
            <select  name="colour" onChange={handleChange} value={productData.colour} >
            <option  hidden>seleccionar color</option>
              {color_select?.map((option, index) => (
              <option key={index} value={option}>{option}</option>))}
            </select>
        <br />
          <span>{errors.colour}</span>
        
        
        <br />
        <label className={s.buttonfile} htmlFor="additionalImage">
          <i><FontAwesomeIcon icon={faImages} /></i>
          Subir Imagenes Adicionales (3):
          <input
            className={s.inputfile}
            disabled={control}
            type="file"
            name="additionalImage"
            id = "additionalImage"
            onChange={handleChangeAdditional}
          />
        </label>
        <br />
        <img src={productData.additionalImage[0]} alt="" />
        <br />
        <div>
          {
            productData.additionalImage[0] && <button type="button" id="button" name="additionalImage0" onClick={removeImageAd}>X</button>
          }
        </div>
        <br />
        <img src={productData.additionalImage[1]} alt="" />
        <br />
        <div>
          {
            productData.additionalImage[1] && <button type="button" id="button" name="additionalImage1" onClick={removeImageAd}>X</button>
          }
        </div>
        <br />
        <img src={productData.additionalImage[2]} alt="" />
        <br />
        <div>
          {
            productData.additionalImage[2] && <button type="button" id="button" name="additionalImage2" onClick={removeImageAd}>X</button>
          }
        </div>
        <span>{control}</span>
        <br />
         <label>Marcas: </label>
        <select onChange={handleChange} name="brands" id="brands" value={productData.brands}>
          <option hidden>seleccionar marca</option>{
            allBrands?.map((b)=><option key={b} value={b.id}>{b.name}</option>)
          }
        </select>
        <br />
        <span>{errors.brands}</span>
        <br />
        
        <button type="submit" id="submit" disabled={buttonDisabled()}>
          Crear Producto
        </button>
        {errorSubmit && <span>{errorSubmit}</span>}
      </form>
      
    </div>
  );
};

export default ProductForm;
