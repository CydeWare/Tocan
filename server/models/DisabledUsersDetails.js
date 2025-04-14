import { DataTypes } from 'sequelize'; // Instead of require()

export default (sequelize) => {
    const DisabledUserDetails = sequelize.define('DisabledUserDetails', {
      DisabledID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      DisabilityType: DataTypes.STRING(100),
      AssistanceNeeds: DataTypes.TEXT,
      EmergencyContactName: DataTypes.STRING(100),
      EmergencyContactPhone: DataTypes.STRING(20)
    });
  
    DisabledUserDetails.associate = (models) => {
      DisabledUserDetails.belongsTo(models.User, {
        foreignKey: 'UserID',
        onDelete: 'CASCADE'
      });
    };
  
    return DisabledUserDetails;
  };