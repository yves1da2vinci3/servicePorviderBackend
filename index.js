import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import http from "http";
import { Server } from "socket.io";
// Route importation
import corsOptions from "./config/corsOptions.js";
import AuthRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import providerRoute from "./routes/ProviderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import connectToDB from "./config/database.js";
import userPresenceManager from "./utils/userOnlineManager.js";

const PORT = process.env.PORT || 3000;

// const redisClient = redis.createClient()

// Initialisation des middlewares globaux

// Initialize redis client
// app.set("redis", redisClient)
const app = express();
const server = http.createServer(app);

// initialisation du socket Server
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// connect tO db
connectToDB();
// Routing

app.use("/api/auth", AuthRoute);
app.use("/api/users", userRoute);
app.use("/api/providers", providerRoute);
app.use("/api/upload", uploadRoute);

app.get("/uploads/*", (req, res) => {
  res.sendFile(path.resolve(`./${req.originalUrl}`));
});

// socket.io server
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.emit("get-socket-id", {
    socketId: socket.id,
  });

  socket.on("map-user-to-socket", ({ socketId, userId ,reservationId }) => {
    userPresenceManager.addUser(`${userId}-${reservationId}`, socketId);
    app.set("onlineUsers", userPresenceManager);
  });

  socket.on("disconnect", () => {
    const reservationUserId = userPresenceManager.removeUser(socket.id);
    if (reservationUserId) {
      app.set("onlineUsers", userPresenceManager);
      console.log("User disconnected:", reservationUserId);
    }
  });
});

app.set("socketio", io);

server.listen(PORT, () => {
  console.log("Starting listening on port " + PORT);
});
