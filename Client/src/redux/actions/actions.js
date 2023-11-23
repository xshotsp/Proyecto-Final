import axios from "axios";


export const getAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/product'); 
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de productos');
      }
  
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  };
  
  getAllProducts()
    .then(products => {
      console.log('Productos obtenidos:', products);
    })
    .catch(error => {
      console.error('Error al obtener productos:', error);
    });
  