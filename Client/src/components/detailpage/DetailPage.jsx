//import { useEffect } from 'react';
//import { connect, useDispatch, useSelector } from 'react-redux';
//import { cleanProductDetail, fetchProductById } from '../../redux/actions/actions';
import s from './detail.module.css';
import { Link, useParams } from 'react-router-dom';
import data from '../data/data'


  const DetailPage = ({ handleAddProduct }) => {
  //const dispatch = useDispatch()
  const { id } = useParams()
  //const productDetails = useSelector((state) => state.productDetails)
  const product = data.find(item => item.id === id)

  // useEffect(() => {
  //   //Llama a la acción para obtener los detalles del producto al montar el componente
  //   dispatch(fetchProductById(params.id));
  //   return () => {dispatch(cleanProductDetail())}
  // }, []);


  if (!data) {
    // Puedes mostrar un indicador de carga o un mensaje de error aquí si productDetails es
        return <p className={s.error}>Cargando...</p>;
  }

  return (
    <div className={s.productDetailsContainer}>
      {/* <h2>{productDetails.id}</h2> */}
      <div className={s.backBtn}>
      <Link to='/'>
        <button>Volver</button>
      </Link>
      </div>
      <br />
      <h1>{product.name}</h1>
      <br />
      {/* <img src={https://${productDetails.image}} alt="product" className={s.productImage} /> */}
      <img src={product.image} 
      alt="product" 
      className={s.productImage} />
      
      <div className={s.shopBtn}>
        <h2>
        <button className={s.addBtn} 
        onClick={() => handleAddProduct(product)}>
          Añadir Al Carrito
        </button>
        </h2>
      </div>
      <div className={s.productInfo}>
        <h2 className={s.price}>Precio: ${product.price}</h2>
        <h2 className={s.colour}>Color: {product.colour}</h2>
      </div>

      <div className={s.descriptionTextBox}>
        <h2 className={s.descriptionText}>Descripción del producto: </h2>
        <p className={s.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam dolorum tempore saepe cupiditate iure modi vel minima temporibus, vitae incidunt iste dicta aliquid velit natus omnis architecto provident autem quidem blanditiis quos totam accusamus? Voluptatem minima nihil illo, culpa suscipit distinctio, ut vel labore voluptatibus deleniti exercitationem odit repudiandae reprehenderit. Dolor voluptatem itaque, eius officiis tempora ea nisi reprehenderit perferendis voluptate fuga ratione enim unde odit eligendi ipsam, voluptatibus soluta similique et magni. Similique, ut reprehenderit vero dolorum temporibus quo sunt enim quod optio voluptatum minima earum veniam necessitatibus nemo. Officia deleniti recusandae a ratione, assumenda, placeat deserunt et delectus obcaecati quaerat facilis excepturi eius animi incidunt ipsa veritatis laborum fugit illum aut ipsum alias veniam necessitatibus? Laboriosam aliquam eius unde nostrum fuga vero inventore hic sit voluptatem modi veniam, accusamus itaque, ipsum delectus quibusdam sapiente vitae voluptate impedit alias laudantium officia facere excepturi? Quod eligendi recusandae quibusdam! Nobis vitae quos temporibus unde doloribus impedit? Voluptates, ipsum. Laboriosam mollitia nesciunt nam aperiam aliquid quidem laudantium id quo, accusantium explicabo ducimus autem deleniti accusamus ipsum ab modi aut tempora beatae dignissimos.</p>
        <br />
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   productDetails: state.productDetails,
// });

// const mapDispatchToProps = {
//   fetchProductById,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
export default DetailPage