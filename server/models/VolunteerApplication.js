import { DataTypes } from 'sequelize'; // Instead of require()

export default (sequelize) => {
    const VolunteerApplication = sequelize.define('VolunteerApplication', {
      ApplicationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ApplicationStatus: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending'
      },
      Message: DataTypes.TEXT,
      ProposedRate: DataTypes.DECIMAL(10, 2)
    }, {
      timestamps: true,
      createdAt: 'CreatedAt'
    });
  
    VolunteerApplication.associate = (models) => {
      VolunteerApplication.belongsTo(models.AssistanceRequest, {
        foreignKey: 'RequestID',
        onDelete: 'CASCADE'
      });
      VolunteerApplication.belongsTo(models.VolunteerDetails, {
        foreignKey: 'VolunteerID',
        onDelete: 'CASCADE'
      });
    };
  
    return VolunteerApplication;
  };