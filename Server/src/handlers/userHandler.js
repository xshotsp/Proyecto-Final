const { getUser , getOneUser } = require('../controllers/userController')
const User = require('../models/User')

const getUserHandler = async(req, res) =>{
    try {
        const results = await getUser()
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const putUserHandler = async(req, res)=>{
    try {
      const{profile_Picture} = req.body 
      const {id} = req.params
      
      if(!profile_Picture) {
        res.status(400).json('Profile picture is required')
      }

      const newUser = await getOneUser(id)

      if (!newUser){
        res.status(404).json('User does not exist')
      }
      newUser.profile_Picture = profile_Picture
      await newUser.save()

      res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createUserHandler = async(req, res)=>{
    try {
        const {username, password, email, profile_Picture} = req.body

        if(!username || !password || !email){
            return res.status(400).json('Missing data')
        }

        const searchUser = await User.findAll({
            where:{
                username: username
            }
        })
        const searchEmail = await User.findAll({
            where: {
                email: email
            }
        })

        if (searchUser.length || searchEmail.length){
            res.status(404).json('User/email already exist')
        } else{
            const newUser = await User.create({username,password, email, profile_Picture})
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {getUserHandler, putUserHandler, createUserHandler};