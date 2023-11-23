const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('product', {
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
    image: {
        type: DataTypes.STRING,
        allowNull: false
      },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    colour: {
        type: DataTypes.STRING,
        allowNull: false
    },
    additionalImage: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false    
    }
  });
}

