import { DataTypes } from 'sequelize'; // Instead of require()

export default (sequelize) => {
    const VolunteerDetails = sequelize.define('VolunteerDetails', {
      VolunteerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Skills: DataTypes.TEXT,
      Availability: DataTypes.TEXT,
      ExperienceLevel: DataTypes.ENUM('beginner', 'intermediate', 'expert'),
      HourlyRate: DataTypes.DECIMAL(10, 2),
      BackgroundCheckStatus: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      }
    });
  
    VolunteerDetails.associate = (models) => {
      VolunteerDetails.belongsTo(models.User, {
        foreignKey: 'UserID',
        onDelete: 'CASCADE'
      });
    };
  
    return VolunteerDetails;
  };