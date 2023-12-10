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
      return res.status(400).json("Incomplete required fields.");
    }

  
    const searchEmail = await User.findAll({
      where: {
        email: email,
      },
    });

    
    if (searchEmail.length) {
       return res.status(404).json("The email already exists.");
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
        from: "message sent by <quirkz41@gmail.com>",
        to: email,
        subject: "Welcome to QUIRKZ",
        html:` 
        <h2>${username}</h2>
        <p>Thank you for choosing our online store QUIRKZ</p>
        <p style="font-size: 16px; color: #0074d9;">
        To go to the page, click <a href="http://localhost:5173" style="text-decoration: none; color: #ff4136; font-weight: bold;">here</a>.
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
      return res.status(400).send("Missing data");
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.password !== password) {
      return res.status(403).send("Incorrect password");
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