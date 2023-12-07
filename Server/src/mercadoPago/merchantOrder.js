require ("dotenv").config()
const { MercadoPagoConfig, MerchantOrder } = require("mercadopago")
const {ACCESS_TOKEN}=  process.env;

const client =  new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN
})

const order = new MerchantOrder(client)

const createMerchantOrder = async (req, res) => {
    try {
        const item = req.body

        let purchaseOrder = item.map((purchase)=>({
            id: purchase.id,
            category_id: purchase.category_id,
            currency_id: "ARS",
            description: purchase.description,
            picture_url: purchase.image,
            quantity: purchase.quantity,
            unit_price: purchase.price,
            title: purchase.name,
        }))

        let paymentOrder = {
            body: {
                purchaseOrder: purchaseOrder
            }
        }

        const response = await order.create(paymentOrder)
        
        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}



module.exports = { createMerchantOrder }