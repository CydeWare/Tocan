import { DataTypes } from 'sequelize'; // Instead of require()

export default (sequelize) => {
    const AssistanceRequest = sequelize.define('AssistanceRequest', {
      RequestID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      Category: {
        type: DataTypes.ENUM('personal_care', 'transportation', 'household', 'companionship', 'other'),
        allowNull: false
      },
      Status: {
        type: DataTypes.ENUM('pending', 'assigned', 'completed', 'cancelled'),
        defaultValue: 'pending'
      },
      ScheduledDate: DataTypes.DATE,
      DurationHours: DataTypes.DECIMAL(4, 2),
      Location: DataTypes.TEXT,
      Latitude: DataTypes.DECIMAL(10, 8),
      Longitude: DataTypes.DECIMAL(11, 8)
    }, {
      timestamps: true,
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt'
    });
  
    AssistanceRequest.associate = (models) => {
      AssistanceRequest.belongsTo(models.DisabledUserDetails, {
        foreignKey: 'DisabledUserID',
        onDelete: 'CASCADE'
      });
    };
  
    return AssistanceRequest;
  };