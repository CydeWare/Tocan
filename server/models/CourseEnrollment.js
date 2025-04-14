import { DataTypes } from 'sequelize'; // Instead of require()

export default (sequelize) => {
    const CourseEnrollment = sequelize.define('CourseEnrollment', {
      EnrollmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CompletionStatus: {
        type: DataTypes.ENUM('not_started', 'in_progress', 'completed'),
        defaultValue: 'not_started'
      },
      CertificateIssued: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: true,
      createdAt: 'EnrollmentDate'
    });
  
    CourseEnrollment.associate = (models) => {
      CourseEnrollment.belongsTo(models.Course, {
        foreignKey: 'CourseID',
        onDelete: 'CASCADE'
      });
      CourseEnrollment.belongsTo(models.User, {
        foreignKey: 'UserID',
        onDelete: 'CASCADE'
      });
    };
  
    return CourseEnrollment;
  };