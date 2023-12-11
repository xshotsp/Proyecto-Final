const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "userProduct",
    {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
    },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    { timestamps: false }
  );
};
