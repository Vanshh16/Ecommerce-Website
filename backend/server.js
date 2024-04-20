const app  = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./database/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err)=> {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");

    server.close(()=>{
        process.exit(1);
    })
})


// config
dotenv.config({path:"backend/config/config.env"});

// Connect Database
connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
})


// Unhandled Promise Rejection
process.on("unhandledRejection", (err)=> {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    })
})

