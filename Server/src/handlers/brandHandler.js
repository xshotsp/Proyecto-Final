const { getBrandsDb } = require("../controllers/brandController")

const getBrandHandler = async (req, res) => {
    try {
        const results = await getBrandsDb()
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getBrandHandler
}