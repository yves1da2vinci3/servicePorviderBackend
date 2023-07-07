import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import path from 'path'
import http from 'http'
// Route importation
import corsOptions from "./config/corsOptions.js";
import AuthRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import providerRoute from './routes/ProviderRoute.js'
import connectToDB from "./config/database.js";


const PORT = process.env.PORT || 3000


// const redisClient = redis.createClient()

// Initialisation des middlewares globaux

// Initialize redis client
// app.set("redis", redisClient)
const app = express()
const server = http.createServer(app)
app.use(compression())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors(corsOptions))


// connect tO db
connectToDB()
// Routing

app.use("/api/auth",AuthRoute)
app.use("/api/users",userRoute)
app.use("/api/providers",providerRoute)




app.get('/uploads/*',(req,res)=>{
    res.sendFile(path.resolve(`./${req.originalUrl}`));
  })







  server.listen(PORT,()=>{
    console.log("Starting listening on port " + PORT);
})

