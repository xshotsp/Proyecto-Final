require("dotenv").config();

const variableGoogle = (req, res) => {
    const variableGoogle = process.env.VITE_CLIENT_ID_GOOGLE;
    res.json({ variableGoogle });
  };
  
  module.exports = {
    variableGoogle,
  };
  