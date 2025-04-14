'use strict';

import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '../config/config.json');
const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const basename = path.basename(__filename);
const config = configFile[env];
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(async (file) => {
//     const modelPath = path.join(__dirname, file);
//     const modelFile = await import(pathToFileURL(modelPath).href);
//     const model = modelFile.default(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//     console.log(`Loaded model: ${model.name}`);
//     console.log("Model returned:", model?.name);

//   });

// Replace the forEach with Promise.all to properly await all model imports
const modelPromises = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .map(async (file) => {
    const modelPath = path.join(__dirname, file);
    const modelFile = await import(pathToFileURL(modelPath).href);
    const model = modelFile.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    console.log(`Loaded model: ${model.name}`);
    return model;
  });

// Wait for all models to be loaded before setting up associations
await Promise.all(modelPromises);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;