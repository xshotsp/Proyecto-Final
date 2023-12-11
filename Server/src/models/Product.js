const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    idApi: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    colour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    additionalImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,    
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    active:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
   
  },{
    timestamps: false
  });
};
