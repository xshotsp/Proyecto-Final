const axios = require("axios")
const {  Brand } = require("../db")
const { API_KEY } = process.env

const getBrandApi = async () => {
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
        const { data } = await axios.request(URL, { params, headers })

        data.products.forEach(
            async({
                brandName
            }) => {
                await Brand.findOrCreate({
                    where: {
                        brand: brandName
                    }
                })
            }
        )
        
      } catch (error) {
        console.log(error.message);
      }
}

module.exports = {
    getBrandApi
}