const { getUser, getAllUsers, updateUser } = require("../controllers/userController");
const { User } = require("../db");
const transporter = require("../functions/sendMails");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

const getUserHandler = async (req, res) => {
  try {
    const { email } = req.params;
    const results = await getUser(email);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers();
    res.status(200).json(response);
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
  console.log(req.body)
  try {
    const { name, lastname, password, email, profile_picture, phone, provider, admin, active} = req.body;

    if (/* !password || */ !email) {
      return res.status(400).json("Campos obligatorios incompletos.");
    }

    const searchEmail = await User.findAll({
      where: {
        email: email,
      },
    });

    if (searchEmail.length) {
      if (searchEmail[0].provider === "google") {
        return res
          .status(404)
          .json(
            "El usuario o correo electronico ya esta registrado con una cuenta de google."
          );
      }

      return res
        .status(404)
        .json("El usuario o el correo electrónico ya existe.");
    } else {


      // para encriptar el password
      // const hashedPassword = await bcrypt.hash(password, 10);
      // password = hashedPassword;

      const newUser = await User.create({
        name,
        lastname,
        password,
        email,
        profile_picture,
        phone,
        provider,
        admin,
        active
      });

      await transporter.sendMail({
        from: "mensaje enviado por <quirkz41@gmail.com>",
        to: email,
        subject: "Bienvenid@ a QUIRKZ",
        html: ` 
        <h2>${name}&nbsp;${lastname}</h2>
        <p>Gracias por preferir nuestra tienda online QUIRKZ</p>
        <p style="font-size: 16px; color: #0074d9;">
      Para ir a la pagina, haz clic <a href="http://localhost:5173" style="text-decoration: none; color: #ff4136; font-weight: bold;">aquí</a>.
    </p>`,
      });

      return res.status(200).json(newUser);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!email || !password) {
      console.log("faltan datos");
      throw new Error("Faltan datos");

    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (user.password !== password) {
      throw new Error("Contraseña incorrecta");
    }
    return res.json({
      access: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserHandler,
  getAllUsersHandler,
  putUserHandler,
  createUserHandler,
  login,
};