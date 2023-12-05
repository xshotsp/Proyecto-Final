require ("dotenv").config()
const {MercadoPagoConfig, Preference} = require("mercadopago")
const {ACCESS_TOKEN}=  process.env;

const client = new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN
})

const payment= new Preference(client)

const createOrder = async (req, res) => {

    try {
        const cart = req.body

        let items = cart.map((product) => ({
            title: product.name,
            quantity: product.quantity,
            unit_price: product.price,
            currency_id: product.currency_id,
            picture_url: product.image,
            description: product.description,
            colour: product.colour
          }));

        let preference = {
            body:{
                items: items,
                // items:[{
                //     title: name,
                //     picture_url: image,
                //     quantity: quantity,
                //     unit_price: price,
                //     colour: colour,
                //     brands: brands,
                //     currency_id: "ARG"
                // }],
                "back_urls": {
                    "success": "http://127.0.0.1:5173/",
                    "failure": "http://127.0.0.1:5173/",
                    "pending": ""
                },
                auto_return: "approved",
            }
        }
               
        const response = await payment.create(preference)

        res.status(200).send(response)
        // res.status(200).send(response.init_point)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const successfulPurchase = (req, res) =>{
    try {
        const {payment_id} = req.query;

        console.log(req);
        res.status(200).send("Pago aprobado")
    } catch (error) {
        res.status(400).json({error: error.message})      
    }
}

module.exports = {
    createOrder,
    successfulPurchase
}