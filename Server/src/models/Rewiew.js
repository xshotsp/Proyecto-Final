const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "rewiew", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                min: 0,
                max: 5,
            },
            defaultValue: 0,
        },
     }, {
        timestamps: false
     }
    )
  }
  //--------------Revisar-----------//