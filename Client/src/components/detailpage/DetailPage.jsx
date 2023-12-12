import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { cleanProductDetail, fetchProductById } from '../../redux/actions/actions';
import ReviewyComentarios from '../Review y comentarios/ReviewyComentarios';
import s from './detail.module.css';
import Card from '../card/Card';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartFlatbed, faHeart, faTruck, faHeartCircleCheck, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DetailPage = ({ login, handleAddProduct }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const allProducts = useSelector((state) => state.allproducts);
  const product = useSelector((state) => state.productDetails);
  console.log(product);
  const sliderRef = useRef(null);
  const mixedProducts = allProducts
  .filter(prod => prod.id !== product.id)
  .toSorted((a, b) => a - b)
  .filter((value, index, self) => self.indexOf(value) === index)
  .slice(0, 5);
  if (product.brands && product.brands.length > 0) {
    var brandName = product.brands[0].name; 
  } else {
    brandName = 'Cargando...'
  }

  const [showHeart, setShowHeart] = useState(true);

  const changeIcon = () => {
    setShowHeart((actualHeart) => !actualHeart);
  };

  const PrevArrow = (props) => (
    <div {...props} className={`${s.customArrow} ${s.customArrowLeft}`} onClick={prevSlide}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );

  const NextArrow = (props) => (
    <div {...props} className={`${s.customArrow} ${s.customArrowRight}`} onClick={nextSlide}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };
  
  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  useEffect(() => {
    if(id && !product.id) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(cleanProductDetail());
    };
  }, [dispatch, id]);

  if (!product) {
    
        return <p className={s.error}>Loading...</p>;
  }

  return (
    <div className={s.productDetailsContainer}>
      <div className={s.backBtn}>
      <Link to='/'>
        <button>Back</button>
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
          <FontAwesomeIcon icon={faCartFlatbed} /> Add shopping cart
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
        <h2 className={s.price}>Price: ${product.price || 'Loading...'}</h2>
        <h2 className={s.colour}>Colour: {product.colour || 'Loading...'}</h2>
        <h2 className={s.brand}>Brand: {brandName}</h2>
      </div>

      <div className={s.descriptionTextBox}>
        <br />
        <h2>Products You May Also Be Interested in</h2>
        <div>
        <Slider ref={sliderRef} {...sliderSettings}>
          {mixedProducts.map((product) => <Card key={product.id} product={product} handleAddProduct={handleAddProduct}/>)}
        </Slider>
        </div>
      </div>
      <ReviewyComentarios login={login} productoId={id}/>
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