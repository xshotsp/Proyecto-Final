require ("dotenv").config()
const { MercadoPagoConfig, Customer } = require("mercadopago")
const {ACCESS_TOKEN}=  process.env;

const client =  new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN
})

const customerClient = new Customer(client)

const createClient = async (req, res) => {
    try {
        const member = req.body

        let payer = member.map((user) => ({
            email: user.email,
            first_name: user.name,
            surname: user.last_name,
            phone: user.phone_number,
            address: user.address
        }))

        let buyer = {
            body: {
                payer: payer
            }
        }

        const response = await customerClient.create(buyer)

        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { createClient }