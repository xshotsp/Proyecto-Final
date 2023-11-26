import axios from "axios";


const URL = "http://localhost:3001";


const getFindSelects = async () => {
            
        
        let allColors = [];
        let allBrands = [];
               

        const productsInfo = (await axios.get(`${URL}/product/all-products`)).data;
        console.log(productsInfo)

        
        //obtiene todos los selects de colour y quita espacios
        for (let i=0; i<productsInfo.length; i++){
            allColors.push(productsInfo[i].colour?.trim());
        }  
 
        
        //quita los repetidos  
        let setColors = new Set (allColors);
        let colorsSinRepetidos = Array.from(setColors);
        console.log(colorsSinRepetidos)

        //los organiza alfabeticamente
        let sortedColors=colorsSinRepetidos.sort();
    

        const brandsInfo = (await axios.get(`${URL}/brands`)).data;

        for (let i=0; i<brandsInfo.length; i++){
            allBrands.push(brandsInfo[i].name?.trim());
        }  
        let sortedBrands = allBrands.sort();
    

       return ({colour: sortedColors, brand: sortedBrands});        
           
}

export default getFindSelects;