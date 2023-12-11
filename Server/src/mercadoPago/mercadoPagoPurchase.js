require ("dotenv").config()
const {MercadoPagoConfig, Preference} = require("mercadopago")
const { createClient } = require("./clients")
const { createPayment } = require("./payment")
const { createMerchantOrder } = require("./merchantOrder")
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
            unit_price: parseInt(product.price),
            currency_id: "ARS",
            picture_url: product.image,
            description: product.description,
            colour: product.colour
          }));

        let preference = {
            body:{
                "external_reference": payer.email,
                 items: items,
                "back_urls": {
                    "success": "http://localhost:5173/success",
                    "failure": "http://quirkzmain.vercel.app",
                    "pending": ""
                },
                auto_return: "approved",
                marketplace: "QUIRKZ",
                statement_descriptor: "QUIRKZ",
                payment_methods: {
                excluded_payment_types: [
                    {
                    id: 'ticket',
                    },
                ],
            },
                binary_mode: true,
                payer: {
                    createClient,
                },
                createPayment,
                createMerchantOrder
            }
        }
        

        const response = await payment.create(preference)

        res.status(200).send(response)
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