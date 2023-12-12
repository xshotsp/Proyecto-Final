const axios = require("axios");
const { Product, Brand, Product_Brand } = require("./db");
const { API_KEY } = process.env;
const cloudinary = require("cloudinary").v2;

// Mapa para la memoria caché
const cache = new Map();

const apiLoaderProducts = async () => {

  const getFromCache = () => {
    const cachedData = cache.get("productData");
    if (cachedData && Date.now() - cachedData.timestamp < 4 * 60 * 60 * 1000) {
      return cachedData.data;
    }
    return null;
  };

  const cachedData = getFromCache();


  if (cachedData) {
    console.log("Recuperando datos de la caché");
    processData(cachedData);
  } else {
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

    console.log(typeof data.products); 
 
    const productPromises = data.products.map(
      async ({
        productCode,
        name,
        imageUrl,
        price,
        colour,
        additionalImageUrls,
        brandName,
        url

      }) => {
        const [product] = await Product.findOrCreate({
          where: {
            idapi:productCode,
            name,
            image: `https://${imageUrl}`,
            price: price.current.value,
            colour,
            additionalImage: additionalImageUrls.map(url => `https://${url}`),
            url: `https://www.asos.com/us/${url}`, 
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

    cache.set("productData", { data, timestamp: Date.now() });

    console.log("Carga en la base de datos exitosa");
  } catch (error) {
    console.log(error.message);
  }
 }
};

module.exports = {
  apiLoaderProducts,
};

