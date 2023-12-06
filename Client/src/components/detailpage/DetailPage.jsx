import React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { cleanProductDetail, fetchProductById } from '../../redux/actions/actions';
import s from './detail.module.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartFlatbed, faHeart, faTruck, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import ReviewyComentarios from '../Review y comentarios/ReviewyComentarios'


  const DetailPage = ({ handleAddProduct }) => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails)
  const product = productDetails

  if (product.brands && product.brands.length > 0) {
    var brandName = product.brands[0].name;
  } else {
    brandName = 'No posee marca'
  }

  const [showHeart, setShowHeart] = useState(true);

  const changeIcon = () => {
    setShowHeart((actualHeart) => !actualHeart);
  };
  
  useEffect(() => {
    // Llama a la acción para obtener los detalles del producto al montar el componente
    dispatch(fetchProductById(id));
    return () => {
      dispatch(cleanProductDetail());
    };
  }, [dispatch, id]);
  


  if (!product) {
    
        return <p className={s.error}>Cargando...</p>;
  }

  return (
    <div className={s.productDetailsContainer}>
      <h2>{product.id}</h2>
      <div className={s.backBtn}>
      <Link to='/'>
        <button>Volver</button>
      </Link>
      </div>
      <br />
      <h1>{product.name}</h1>
      <br />
      <img src={product.image} 
      alt="product" 
      className={s.productImage} />
      
      <div className={s.shopBtn}>
        <h2>
        <button className={s.addBtn} 
        onClick={() => handleAddProduct(product)}>
          <FontAwesomeIcon icon={faCartFlatbed} /> Añadir Al Carrito
        </button>
        <button onClick={changeIcon}>
          <FontAwesomeIcon icon={showHeart ? faHeart : faHeartCircleCheck} />
        </button>
        <br />
        <span>
          <p>
            <FontAwesomeIcon icon={faTruck} /> Envios gratis en tus ordenes a partir de $3000
          </p>
        </span>
        </h2>
      </div>
      <div className={s.productInfo}>
        <h2 className={s.price}>Precio: ${product.price}</h2>
        <h2 className={s.colour}>Color: {product.colour}</h2>
        <h2 className={s.brand}>Marca: {brandName}</h2>
      </div>

      <div className={s.descriptionTextBox}>
        {/* <h2 className={s.descriptionText}>Descripción del producto: </h2> */}
        {/* <p className={s.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam dolorum tempore saepe cupiditate iure modi vel minima temporibus, vitae incidunt iste dicta aliquid velit natus omnis architecto provident autem quidem blanditiis quos totam accusamus? Voluptatem minima nihil illo, culpa suscipit distinctio, ut vel labore voluptatibus deleniti exercitationem odit repudiandae reprehenderit. Dolor voluptatem itaque, eius officiis tempora ea nisi reprehenderit perferendis voluptate fuga ratione enim unde odit eligendi ipsam, voluptatibus soluta similique et magni. Similique, ut reprehenderit vero dolorum temporibus quo sunt enim quod optio voluptatum minima earum veniam necessitatibus nemo. Officia deleniti recusandae a ratione, assumenda, placeat deserunt et delectus obcaecati quaerat facilis excepturi eius animi incidunt ipsa veritatis laborum fugit illum aut ipsum alias veniam necessitatibus? Laboriosam aliquam eius unde nostrum fuga vero inventore hic sit voluptatem modi veniam, accusamus itaque, ipsum delectus quibusdam sapiente vitae voluptate impedit alias laudantium officia facere excepturi? Quod eligendi recusandae quibusdam! Nobis vitae quos temporibus unde doloribus impedit? Voluptates, ipsum. Laboriosam mollitia nesciunt nam aperiam aliquid quidem laudantium id quo, accusantium explicabo ducimus autem deleniti accusamus ipsum ab modi aut tempora beatae dignissimos.</p> */}
        <br />
        <h2>Productos Que Tambien Te Pueden Interesar</h2>
      </div>
      <div>{productDetails[0]}</div>
      <ReviewyComentarios/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productDetails: state.productDetails,
});

const mapDispatchToProps = {
  fetchProductById,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);