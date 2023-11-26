const axios = require("axios");
const { Product, Brand, Product_Brand } = require("./db"); // Asumo que ProductBrand es el modelo de la tabla intermedia
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
    data.products.forEach(
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
            image: `https://}${imageUrl}`,
            // image: imageUrl,

            price: price.current.text,
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
    console.log("Carga en la base de datos exitosa");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  apiLoaderProducts,
};
