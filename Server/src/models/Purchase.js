const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Purchase', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    items: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    order: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    }
  },{
    timestamps: false
  });
};
