const { User } = require ('../db')

const getUser = async () => {
    const allUsers = await User.findAll()
    return allUsers
}

const getOneUser = async (id) => {
    const user = await User.findOne({
        where: {
            id: id
        }
    })
    return user
}



module.exports = { getUser, getOneUser}