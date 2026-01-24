import express, { Express } from "express"; 
import morgan from "morgan"; 
import helmet from "helmet";

import apiRoutes from "./routes";
import { sendResponse } from "./utils/sendResponse";
import { sequelize } from "./config/database";
 
console.log( 
    'ENV:', process.env.ENV, 
    'PORT:', process.env.PORT 
); 
 
const server = express(); 
const PORT = process.env.PORT || 4001; 
 
const ENV = process.env.ENV || "DEV"; 
 
//Middlewares base 
server.use(helmet()) ;
server.use(express.json());

//Configuración LOGs
if( ENV === "PROD"){ 
    server.use(morgan('combined')); 
}else{ 
    server.use(morgan('dev')); 
} 

server.use("/api/v1", apiRoutes);
 
server.get('/', (req, res)=> { 
    res.send('Hello SUGC');   
}); 
 
//monitoring and health  
//aunque en la prueba no se pide esto es una buena practica para DevOps  
server.get('/version', (req, res) => { 
    sendResponse(res, 200, { status: "success", message:"version info",  data: { 
      version: process.env['BUILD_TAG'] || '0.0.0-DEV', //for future deploys 
     }});
}); 

server.get('/healthz', (req, res) => sendResponse(res, 200, { status: "success", message:"Server is healthy"})); 
 
async function startSever() {
    try {
        await sequelize.authenticate();
        server.listen(PORT, () => {
            console.log(`Hello SUGC from NodeJS + Typescript. Server started on ${PORT}`);
        })
    }catch(error){
        console.error('No se pudo conectar con la DB', error);
        process.exit(1);
    }
}

startSever();