import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import db from "./models/index.js";
const { User } = db;

// const startServer = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json({limit: "30mb", extended: true})); 
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get("/", (req, res) => {
    res.send("<h1>Welcome to the server!</h1>");
  });

  app.get("/users", async (req, res) => { 

    try{
        const users = await User.findAll({where :{firstName: "John"}});
        res.json(users);

    } catch(err){
        console.error(err);
    }
        
  });

  app.get("/insert", (req, res) => {
    // console.log("Received data:", req.body);
    User.create({

        firstName: "John",
        lastName: "Doe",
    }).catch(err => {
        if(err) console.error(err)
    })
    res.json({ message: "Data received successfully!" });

  });

  app.get("/delete", async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                firstName: "John",
                lastName: "Doe"
            }
        });
        res.json({ message: "Data deleted successfully!" });
    } catch (err) {
        console.error(err);
    }
  });

  

  const PORT = process.env.PORT || 5000;

  console.log("Models loaded:", Object.keys(db));

  
  
  try {
    await db.sequelize.sync();
    console.log("✅ Sequelize synced! Tables should be created.");
    // app.use("*", (req, res) => {
    //     // res.end("<h1>404 Not Found</h1>");
    //   });
    app.listen(PORT, () => {
        console.log("App is listening on port " + PORT);
    });
  } catch (err) {
    console.error("Failed to sync database:", err);
  }
// };

// startServer();