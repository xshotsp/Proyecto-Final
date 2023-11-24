import axios from "axios";


const URL = "http://localhost:3001";


const getFindSelects = async () => {
            
        const allCategories = [];
        let allColors = [];
        let allSize = [];
       
        const productsInfo = (await axios.get(`${URL}/products/all-products`)).data;
        //obtiene todos los selects y quita espacios
        for (let i=0; i<productsInfo.length; i++){
            allCategories.push(productsInfo[i].category?.trim());
            allColors.push(productsInfo[i].color?.trim());
            allSize.push(productsInfo[i].size?.flatMap(siz => Object.keys(siz)));
            //allSize.flat();
            //console.log(allSize)
        }  
 
        //quita los repetidos
        const setCategories = new Set (allCategories);
        let categoriesSinRepetidos = Array.from(setCategories);
        
        let setColors = new Set (allColors);
        let colorsSinRepetidos = Array.from(setColors);
        
        let setSizes = new Set (allSize.flat());
        let sizesSinRepetidos = Array.from(setSizes);
        //console.log(sizesSinRepetidos)

        //los organiza alfabeticamente
        let sortedCategories = categoriesSinRepetidos.sort();       
        let sortedColors=colorsSinRepetidos.sort();
        
        //los organiza talla menor a mayor
        let sortedSize = [];
        for (let size of sizesSinRepetidos){
            if (size === 'XS') sortedSize.push(size)
        }
        for (let size of sizesSinRepetidos){
            if (size === 'S') sortedSize.push(size)
        }
        for (let size of sizesSinRepetidos){
            if (size === 'M') sortedSize.push(size)
        }
        for (let size of sizesSinRepetidos){
            if (size === 'L') sortedSize.push(size)
        }
        for (let size of sizesSinRepetidos){
            if (size === 'XL') sortedSize.push(size)
        }
        for (let size of sizesSinRepetidos){
            if (size === 'XXL') sortedSize.push(size)
        }
       return ({category: sortedCategories, color: sortedColors, size: sortedSize});        
           
}

export default getFindSelects;