const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      email: { 
        primaryKey: true, 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_picture: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue:
          "https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg",
      },
      // name:{
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      // last_name:{
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      phone_number:{
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      // address:{
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
    },
    {
      timestamps: false,
    }
  );
};
//-------------------Revisar--------------//
