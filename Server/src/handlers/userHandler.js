const { getUser, getOneUser } = require("../controllers/userController");
const { User } = require("../db");
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
    const { username, password, email, profile_picture, member } = req.body;

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
      const newUser = await User.create({
        username,
        password,
        email,
        profile_picture,
        member,
      });
      return res.status(200).json(newUser);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserHandler, putUserHandler, createUserHandler };