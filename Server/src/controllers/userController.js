const { User } = require ('../db')
const cloudinary = require("cloudinary").v2;

const getUser = async (email) => {
    const user = await User.findByPk(email)
    return user
}

const getUsers = async () => {
    const users = await User.findAll()
    return users
}

const updateUser = async (email, newData) => {
    try {
    
        const usertoUpdate = await User.findByPk(email);

        if (!usertoUpdate) {
            throw new Error(`User with email ${email} not found`);
        }

        let { profile_picture} = newData;

         // CLOUDINARY
       if (profile_picture){
         const cloudinaryUpload = await cloudinary.uploader.upload(`${profile_picture}`);
         profile_picture = cloudinaryUpload.secure_url;
       }

        newData.profile_picture = profile_picture
        await usertoUpdate.update(newData);

        return usertoUpdate;
    }   catch (error) {
        throw error;
    }
}



module.exports = { getUser, getUsers, updateUser}