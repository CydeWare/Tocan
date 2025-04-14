import { DataTypes } from 'sequelize'; // Instead of require()

export default (sequelize) => {
    const CompletedService = sequelize.define('CompletedService', {
      CompletionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ActualHours: DataTypes.DECIMAL(4, 2),
      TotalPayment: DataTypes.DECIMAL(10, 2),
      RatingByDisabled: DataTypes.TINYINT,
      RatingByVolunteer: DataTypes.TINYINT,
      FeedbackByDisabled: DataTypes.TEXT,
      FeedbackByVolunteer: DataTypes.TEXT
    }, {
      timestamps: true,
      createdAt: 'CompletedAt'
    });
  
    CompletedService.associate = (models) => {
      CompletedService.belongsTo(models.AssistanceRequest, {
        foreignKey: 'RequestID'
      });
      CompletedService.belongsTo(models.VolunteerDetails, {
        foreignKey: 'VolunteerID'
      });
      CompletedService.belongsTo(models.DisabledUserDetails, {
        foreignKey: 'DisabledUserID'
      });
    };
  
    return CompletedService;
  };