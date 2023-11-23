const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_Picture: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg'
        },
        register: {
            type: DataTypes.DATEONLY,
            defaultValue: NOW
        },
        member: {
            type: DataTypes.STRING,
            defaultValue: 'standar'
        }
    },{
        timestamps: false
    }
  )
}