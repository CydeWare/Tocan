import { DataTypes } from 'sequelize'; // Instead of require()

export default (sequelize) => {
    const Course = sequelize.define('Course', {
      CourseID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      Description: DataTypes.TEXT,
      Instructor: DataTypes.STRING(100),
      DurationHours: DataTypes.DECIMAL(4, 2),
      Price: DataTypes.DECIMAL(10, 2),
      IsFree: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: true,
      createdAt: 'CreatedAt'
    });
  
    return Course;
  };