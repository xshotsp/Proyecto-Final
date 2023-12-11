require ("dotenv").config()
const { MercadoPagoConfig, Payment } = require("mercadopago")
const {ACCESS_TOKEN}=  process.env;

const client =  new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN
})

const payment = new Payment(client)

const createPayment = async (req, res) => {
    try {
        const purchase = req.body

        let buy = purchase.map((ticket)=>({
            transaction_amount: ticket.transaction_amount,
            desciption: ticket.desciption,
            payment_method_id: ticket.payment_method_id,
            payer: {
                email: user.email
            }
        }))

        let paymentPurchase = {
            body: {
                buy: buy
            }
        }

        const response = await payment.create(paymentPurchase)

        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}



module.exports = { createPayment }