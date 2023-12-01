const { getUser, getOneUser } = require("../controllers/userController");
const { User } = require("../db");
const transporter = require("../functions/sendMails");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");


const getUserHandler = async (req, res) => {
  try {
    const results = await getUser();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putUserHandler = async (req, res) => {
  try {
    const { profile_picture } = req.body;
    const { id } = req.params;

    if (!profile_picture) {
      res.status(400).json("Profile picture is required");
    }

    const newUser = await getOneUser(id);

    if (!newUser) {
      res.status(404).json("User does not exist");
    }
    newUser.profile_picture = profile_picture;
    await newUser.save();

    return res.status(200).json(newUser);
  } catch (error) {
   return res.status(400).json({ error: error.message });
  }
};

const createUserHandler = async (req, res) => {
  try {
    let { username, password, email, profile_picture, member } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json("Campos obligatorios incompletos.");
    }

    const searchUser = await User.findAll({
      where: {
        username: username,
      },
    });
    const searchEmail = await User.findAll({
      where: {
        email: email,
      },
    });

    if (searchUser.length || searchEmail.length) {
       return res.status(404).json("El usuario o el correo electrónico ya existe.");
    } else {

       // CLOUDINARY
      if (profile_picture){
        const cloudinaryUpload = await cloudinary.uploader.upload(`${profile_picture}`);
        profile_picture = cloudinaryUpload.secure_url;
      }

      // para encriptar el password
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;

      const newUser = await User.create({
        username,
        password,
        email,
        profile_picture,
        member,
      });


      await transporter.sendMail({
        from: "mensaje enviado por <quirkz41@gmail.com>",
        to: email,
        subject: "Bienvenid@ a QUIRKZ",
        html:` 
        <h2>${username}</h2>
        <p>Mensaje de Bienvenida de nuestra tienda online QUIRKZ</p>
        <p style="font-size: 16px; color: #0074d9;">
      Para ir a la pagina, haz clic <a href="http://localhost:5173" style="text-decoration: none; color: #ff4136; font-weight: bold;">aquí</a>.
    </p>` ,
      })
    





      

      return res.status(200).json(newUser);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserHandler, putUserHandler, createUserHandler };