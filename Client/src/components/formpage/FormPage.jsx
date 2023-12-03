import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  getProducts,
  getBrands,
} from "../../redux/actions/actions";
// import axios from "axios";
import s from "./productForm.module.css"
import Swal from 'sweetalert2';
const URL="https://quirkz.up.railway.app"

const ProductForm = () => {
  const dispatch = useDispatch();
  const allBrands = useSelector((state)=>state.allBrands);
  
  
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

  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
    colour: "",
    //additionalImage: [],
    brands: [],
  });

  const [errors, setErrors] = useState({
    name: "Data is required",
    image: "",
    price: "Data is required",
    colour: "Data is required",
    //additionalImage: [],
    brands: []
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

    if(name==="brands"){
      if(!productData.brands.length) setErrors({...errors, brands:"La marca es requerida"})
      else setErrors({...errors, brands: ""})
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
        [e.target.name]: e.target.value
      }, e.target.name);
    //return;
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch(createProductRequest());

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/product",
  //       productData
  //     );
  //     const newProduct = response.data;

  //     dispatch(createProductSuccess(newProduct));
  //   } catch (error) {
  //     console.error("Error al crear el producto:", error.message);
  //     dispatch(createProductFailure(error.message));
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postProduct(productData));
  };

  return (
    <div>
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
        <label>
          Imagen:
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChangeImage}
          />
          
        <span>{errors.image}</span>
        </label>
        <br />
        <img src={productData.image} alt="" />
       <br />
       <div>
        {
          productData.image && <button type="button" id="button" name="image" onClick={removeImage}>X</button>
        }
        
        </div>
        <label>
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
        <label>
          Color:
          <input
            type="text"
            name="colour"
            id="colour"
            value={productData.colour}
            onChange={handleChange}
          />
          <span>{errors.colour}</span>
        </label>
        
        <br />
        {/* <label>
          Imagen Adicional:
          <input
            disabled={control}
            type="file"
            name="additionalImage"
            id = "additionalImage"
            onChange={handleChangeAdditional}
          />
        </label>
        <br /> */}
         <label>Marcas: </label>
        <select onChange={handleChange} name="brands" id="">
          <option hidden>seleccionar marca</option>{
            allBrands?.map((b)=><option key={b.id} value={b.name}>{b.name}</option>)
          }
        </select>
        <div>
          {
            productData.additionalImage[0] && <button type="button" id="button" name="additionalImage0" onClick={removeImageAd}>X</button>
          }
        </div>
        <span>{errors.brands}</span>
        <input disabled={buttonDisabled()} type="submit"/>
        {/*<button type="submit" disabled={creatingProduct}>
          Crear Producto
        </button>*/}
      </form>

      {/* Mostrar el resultado de la creación */}
      {/* {newProduct && <p>Producto creado con éxito: {newProduct.name}</p>}
      {error && <p>Error al crear el producto: {error}</p>} */}
    </div>
  );
};

export default ProductForm;