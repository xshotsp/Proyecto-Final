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

      const { data } = await axios.request(URL, { params, headers })
      
      const allBrand = data.products?.map((p) => (p.brandName ? p.brandName : "No Info"))

      let oneBrand = [...new Set(allBrand.flat())]
      oneBrand.forEach((b) => {
        if(b){
          Brand.findOrCreate({
            where: {name: b}
          })
        }
      })
      oneBrand = await Brand.findAll()
      return oneBrand
}

module.exports = {
    getBrandApi
}