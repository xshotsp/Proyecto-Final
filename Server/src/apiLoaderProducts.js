const axios = require("axios");
const { Product } = require("./db");
const { API_KEY } = process.env;

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
      }) => {
        await Product.findOrCreate({
          where: {
            name,
            image: imageUrl,
            price: price.current.text,
            colour,
            additionalImage: additionalImageUrls,
          },
        });
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
