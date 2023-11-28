import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { cleanProductDetail, fetchProductById } from '../../redux/actions/actions';
import s from './detail.module.css';
import { useParams } from 'react-router-dom';

  const DetailPage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const productDetails = useSelector((state) => state.productDetails)

  useEffect(() => {
    // Llama a la acción para obtener los detalles del producto al montar el componente
    dispatch(fetchProductById(params.id));
    return () => {dispatch(cleanProductDetail())}
  }, []);

  if (!productDetails) {
    // Puedes mostrar un indicador de carga o un mensaje de error aquí si productDetails es nulo
    return <p className={s.error}>Cargando...</p>;
  }

  return (
    <div className={s.productDetailsContainer}>
      {/* <h2>{productDetails.id}</h2> */}
      <h1>{productDetails.name}</h1>
      {/* <img src={https://${productDetails.image}} alt="product" className={s.productImage} /> */}
      <img src={productDetails.image} alt="product" className={s.productImage} />
      <div className={s.productInfo}>
        <p>Precio: {productDetails.price}</p>
        <p>Color: {productDetails.colour}</p>
      </div>
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