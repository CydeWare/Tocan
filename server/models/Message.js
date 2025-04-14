import { DataTypes } from 'sequelize'; // Instead of require()

export default (sequelize) => {
    const Message = sequelize.define('Message', {
      MessageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      MessageText: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      IsRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: true,
      createdAt: 'SentAt'
    });
  
    Message.associate = (models) => {
      Message.belongsTo(models.User, {
        foreignKey: 'SenderID',
        as: 'Sender',
        onDelete: 'CASCADE'
      });
      Message.belongsTo(models.User, {
        foreignKey: 'ReceiverID',
        as: 'Receiver',
        onDelete: 'CASCADE'
      });
      Message.belongsTo(models.AssistanceRequest, {
        foreignKey: 'RequestID',
        onDelete: 'SET NULL'
      });
    };
  
    return Message;
  };