// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('User', {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    PasswordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Phone: DataTypes.STRING(20),
    ProfilePictureURL: DataTypes.STRING(255),
    UserType: {
      type: DataTypes.ENUM('volunteer', 'disabled', 'admin'),
      allowNull: false
    },
    Bio: DataTypes.TEXT,
    Address: DataTypes.TEXT,
    City: DataTypes.STRING(50),
    State: DataTypes.STRING(50),
    ZipCode: DataTypes.STRING(20),
    Latitude: DataTypes.DECIMAL(10, 8),
    Longitude: DataTypes.DECIMAL(11, 8),
    IsVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  });

  return User;
};