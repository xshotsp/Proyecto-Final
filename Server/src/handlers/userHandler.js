const { getUser, updateUser } = require("../controllers/userController");
const { User } = require("../db");
const transporter = require("../functions/sendMails");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");



const getUserHandler = async (req, res) => {
  try {
    
    const {email} = req.params
    const results = await getUser(email);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putUserHandler = async (req, res) => {
  try {
    
    const { email } = req.params;
    const newUser = await updateUser(email, req.body);
    return res.status(200).json(newUser);
  } catch (error) {
   return res.status(400).json({ error: error.message });
  }
};

const createUserHandler = async (req, res) => {
  try {

    const { username, password, email, profile_picture, phone } = req.body;

   
    if (!password || !email) {
      return res.status(400).json("Campos obligatorios incompletos.");
    }

  
    const searchEmail = await User.findAll({
      where: {
        email: email,
      },
    });

    
    if (searchEmail.length) {
       return res.status(404).json("El correo electrónico ya existe.");
    } else {

   

      // para encriptar el password
/*       const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword; */

      const newUser = await User.create({
        username,
        password,
        email,
        profile_picture,
        phone,
      });


      await transporter.sendMail({
        from: "mensaje enviado por <quirkz41@gmail.com>",
        to: email,
        subject: "Bienvenid@ a QUIRKZ",
        html:` 
        <h2>${username}</h2>
        <p>Gracias por preferir nuestra tienda online QUIRKZ</p>
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


const login = async (req, res) => {
  console.log(req.query)

  try {
    const { email, password } = req.query;  
    if (!email || !password) {
      return res.status(400).send("Faltan datos");
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    if (user.password !== password) {
      return res.status(403).send("Contraseña incorrecta");
    }
    return res.json({
      access: true,
      email: user.email,
      photo: user.profile_picture
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


module.exports = { getUserHandler, putUserHandler, createUserHandler ,login};