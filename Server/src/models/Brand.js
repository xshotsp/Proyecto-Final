const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Brand', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
  });
};