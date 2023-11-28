const axios = require("axios");
const { Product, Brand, Product_Brand } = require("./db");
const { API_KEY } = process.env;
const cloudinary = require("cloudinary").v2;

const apiLoaderProducts = async () => {
  const params = {
    store: "US",
    offset: "0",
    categoryId: "4209",
    limit: "48",
  };

  const headers = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "asos2.p.rapidapi.com",
  };

  const URL = "https://asos2.p.rapidapi.com/products/v2/list";

  try {
    const { data } = await axios.request(URL, { params, headers });

    // Utiliza map para crear un array de promesas
    const productPromises = data.products.map(
      async ({
        name,
        imageUrl,
        price,
        colour,
        additionalImageUrls,
        brandName,
      }) => {
        const [product] = await Product.findOrCreate({
          where: {
            name,
            image: `https://${imageUrl}`,
            price: price.current.value,
            colour,
            additionalImage: additionalImageUrls,
          },
        });

        // Busca o crea la marca
        const [brand] = await Brand.findOrCreate({
          where: {
            name: brandName,
          },
        });

        // Crea la relación en la tabla intermedia
        await product.addBrand(brand);
      }
    );

    // Usa Promise.all para esperar a que todas las promesas se resuelvan
    await Promise.all(productPromises);

    console.log("Carga en la base de datos exitosa");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  apiLoaderProducts,
};

