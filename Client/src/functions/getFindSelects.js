import axios from "axios";


const URL = import.meta.env.VITE_URL


const getFindSelects = async () => {
            
        
        let allColors = [];
        let allBrands = [];
               

        const productsInfo = (await axios.get(`${URL}/product/all-products`)).data;
        
        const productsInfoActive = [...productsInfo].filter((p)=> p.active === true)
        
        //obtiene todos los selects de colour y quita espacios
        for (let i=0; i<productsInfoActive.length; i++){
            allColors.push(productsInfoActive[i].colour?.trim());
        }  
 
        
        //quita los repetidos  
        let setColors = new Set (allColors);
        let colorsSinRepetidos = Array.from(setColors);
        

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