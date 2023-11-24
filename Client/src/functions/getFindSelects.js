import axios from "axios";


const URL = "http://localhost:3001";


const getFindSelects = async () => {
            
        
        let allColors = [];
       
        const productsInfo = (await axios.get(`${URL}/products/`)).data;
        //obtiene todos los selects y quita espacios
        for (let i=0; i<productsInfo.length; i++){
            allColors.push(productsInfo[i].colour?.trim());
           
            //allSize.flat();
            //console.log(allSize)
        }  
 
        //quita los repetidos
        
        
        let setColors = new Set (allColors);
        let colorsSinRepetidos = Array.from(setColors);
        
        //console.log(sizesSinRepetidos)

        //los organiza alfabeticamente
           
        let sortedColors=colorsSinRepetidos.sort();
        
       
        
       return ({colour: sortedColors});        
           
}

export default getFindSelects;