const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    itemCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Category;
