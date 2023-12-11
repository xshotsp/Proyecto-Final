


const renderTable = () => {

    const data = [
        {
          id: 1,
          image: "image.jpg",
          name: "Producto 1",
          color: "Rojo",
          price: 100,
          brand: "Marca 1",
        },
        {
          id: 2,
          image: "image2.jpg",
          name: "Producto 2",
          color: "Verde",
          price: 200,
          brand: "Marca 2",
        },
      ];

    
    
    return (

        <div>
            <table id="my-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Color</th>
                <th>Precio</th>
                <th>Marca</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
            </table>

        </div>


    )


}

export default renderTable;