import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProductById } from '../../redux/actions/actions';
import s from './detail.module.css';

const DetailPage = ({ match, productDetails, fetchProductById }) => {
  const { id } = match.params;

  useEffect(() => {
    // Llama a la acción para obtener los detalles del producto al montar el componente
    fetchProductById(id);
  }, [id, fetchProductById]);

  if (!productDetails) {
    // Puedes mostrar un indicador de carga o un mensaje de error aquí si productDetails es nulo
    return <p className={s.error}>Cargando...</p>;
  }

  const { name, imageUrl, price, colour, description } = productDetails;

  return (
    <div className={s.productDetailsContainer}>
      <h1>{name}</h1>
      <img src={imageUrl} alt={name} className={s.productImage} />
      <div className={s.productInfo}>
        <p>Precio: {price}</p>
        <p>Color: {colour}</p>
        <p>Descripción: {description}</p>
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
